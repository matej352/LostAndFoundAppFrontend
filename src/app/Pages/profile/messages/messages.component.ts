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
  }



  generateSignalRConnectionObject() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44326/chat", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();
  }

}
