import { CreateMessageDTO } from './../../DTOs/CreateMessageDTO';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Account } from 'src/app/Models/Account';

import { HubConnection, HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  hubConnection!: HubConnection;

  messageForm!: FormGroup;

  account?: Account;
  loggedInUsersUsername!: string;
  recieverId!: number;
  connectionId?: string;

  constructor(private route: ActivatedRoute,
     private accountService: AccountService,
     private checkIfLoggedInService: CheckIfLoggedInService,
     private router: Router) { }

  ngOnInit(): void {

    this.loggedInUsersUsername =  this.checkIfLoggedInService.getLoggedInUsersUsername();

    this.route.paramMap.subscribe(async params => {
      let idString = params.get("id");
      if (idString) {
        this.recieverId = Number.parseInt(idString);
      }
 
      if (this.recieverId) {
        await this.accountService.getAccountById(this.recieverId).toPromise().then( 
          (a) => {
                this.account = a;
                
          }
        
        
        );
      }  
    });


    this.createMessageForm();

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

  }


  saveConnId(connId: string, username: string) {
    console.log(connId + " " + username)
    this.accountService.saveConnId(connId, username).subscribe();
  }



  generateSignalRConnectionObject() {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44326/chat", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();
  }


  returnHome(): void {
    this.hubConnection.stop();
    this.router.navigate(["/home"]);
  }


  private createMessageForm(): void {
    this.messageForm = new FormGroup({
      Content: new FormControl('', {validators: [Validators.required, Validators.minLength(1)]}),
    });
  }



  send() {

   
    let message = {
      content: this.messageForm.get('Content')?.value,
      recieverId: this.recieverId,
      From: this.loggedInUsersUsername,
    }

    //console.log(message)

    this.hubConnection.invoke("SendMessageAsync", message);

    this.returnHome();


  }

}

