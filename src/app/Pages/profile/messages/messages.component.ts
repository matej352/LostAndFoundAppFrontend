import { EventEmitterObject } from './../../../Models/EventEmitterObject';
import { Account } from './../../../Models/Account';
import { UiService } from './../../../Services/ui.service';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { AccountService } from 'src/app/Services/account.service';
import { Component, OnInit } from '@angular/core';


import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  loggedInUsersUsername!: string;

  recieversAccount?: Account;
  sendersAccount?: Account;

  hubConnection!: HubConnection;

  stiglo: boolean = false;

  constructor(private accountService: AccountService,
              private checkIfLoggedInService: CheckIfLoggedInService,
              private uiService: UiService) { }

  async ngOnInit(): Promise<void> {

    this.loggedInUsersUsername =  this.checkIfLoggedInService.getLoggedInUsersUsername();

    this.generateSignalRConnectionObject();

    this.hubConnection.start()
    .then(
      () => {
        console.log('Connection started!');

        //ona metoda koja se zadala an backendu da će se izvesti na frontendu
        this.hubConnection.on("RecieveConnId", (connectionId) => {
          localStorage.setItem("connectionId", connectionId);

          //save connectionId in database
          this.saveConnId(connectionId, this.loggedInUsersUsername);
         });

      
      })
    .catch(
      err => console.log('Error while establishing connection!')
    );


    
     //register listener
     this.hubConnection.on("RecieveMessage", (message) => {
      console.log(message);

      this.uiService.messageSent(message);

     })
     


  }


  saveConnId(connId: string, username: string) {
    console.log(connId + " " + username)
    this.accountService.saveConnId(connId, username).subscribe();
  }

  ngOnDestroy(): void {
    this.hubConnection.stop();
    console.log('Connection ended!');
  }



  generateSignalRConnectionObject() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44326/chat", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();
  }




  async sendMessage(obj: EventEmitterObject) {

    await this.getAccount(obj.recieversUsername);
    await this.getAccountOfLoggedInUser(this.loggedInUsersUsername);

    

    if (this.recieversAccount && this.sendersAccount) {
      let messageForService = {
        content : obj.messageContent,
        recieverId : this.recieversAccount.accountId,
        From : this.sendersAccount.accountId,
      }

      let messageForSignalR = {
        content : obj.messageContent,
        recieverId : this.recieversAccount.accountId,
        From : this.loggedInUsersUsername,
      }


      this.hubConnection.invoke("SendMessageAsync", messageForSignalR);  //radim sa razlicitim objektima poruka...

       //bitno da se pojavi i poruka odmah korisniku koji ju je upravo poslao
       this.uiService.messageSent(messageForService); 

    }  

  }

  private async getAccount(username: string): Promise<void> {

    await this.accountService.getAccount(username).toPromise().then(
      res => {
        this.recieversAccount = res;
      }
    );
  }

  private async getAccountOfLoggedInUser(username: string): Promise<void> {

    await this.accountService.getAccount(username).toPromise().then(
      res => {
        this.sendersAccount = res;
      }
    );
  }

}
