import { Account } from 'src/app/Models/Account';
import { AccountService } from 'src/app/Services/account.service';
import { UiService } from './../../../../Services/ui.service';
import { MessageGroup } from './../../../../Models/MessageGroup';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from './../../../../Services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { Message } from 'src/app/Models/Message';
import { MessageSignalR } from 'src/app/Models/MessageSignalR';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  recieverAccount?: Account;

  subscriptionSignalRLatestMessage!: Subscription;

  newMessageWhileChatOpened: boolean = false;

  newLatestMessage!: MessageSignalR;

  dateWhenMessageReceived!: Date;

  loggedInUsersUsername!: string;



  groups$!: Observable<MessageGroup[]>;

  constructor( private checkIfLoggedInService: CheckIfLoggedInService,
      private messageService: MessageService,
      private uiService: UiService,
      private accountService: AccountService
   ) {

    this.subscriptionSignalRLatestMessage = uiService.onMessageRecieved().subscribe( async msg => {
      
      console.log("poruka poslana ili stigla pa se mora osvježiti sidebar");

      if (this.newLatestMessage) {
        this.jaPoslao(this.loggedInUsersUsername);
      }
      

      this.dateWhenMessageReceived = new Date()
      this.newMessageWhileChatOpened = true;
      this.newLatestMessage = msg;

      console.log(msg.from + "    IDE GAS")
      console.log(msg.content + "    IDE GAS")
      console.log(msg.recieverId + "    IDE GAS")


      await this.accountService.getAccountById(msg.recieverId).toPromise().then( 
        (a) => {
              this.recieverAccount = a;    
        }
      );


    });
  }

  ngOnInit(): void {

    this.loggedInUsersUsername = this.checkIfLoggedInService.getLoggedInUsersUsername();

    this.getMessageGroups(this.loggedInUsersUsername);


  }


  getMessageGroups(username: string) {
    this.groups$ = this.messageService.getChatGroups(username);
  }


  chatGroupSelected(chatWith: string): void {
    this.uiService.chatSelected(chatWith);


  }

  jaPoslao(username: string): boolean {

    if (this.newLatestMessage) {
      console.log("TEST1  " + this.newLatestMessage.from);
    console.log("TEST2  " + username);
    if (this.newLatestMessage.from == username) {
      return true;
    } else {
      return false;
    }
    } else {
      return false;
    }

    
  }
  

}

