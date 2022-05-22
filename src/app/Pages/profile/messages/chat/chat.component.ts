import { EventEmitterObject } from './../../../../Models/EventEmitterObject';
import { MessageSignalR } from './../../../../Models/MessageSignalR';
import { Account } from './../../../../Models/Account';
import { AccountService } from './../../../../Services/account.service';
import { MessageService } from './../../../../Services/message.service';
import { UiService } from './../../../../Services/ui.service';
import { Subscription, Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { Message } from 'src/app/Models/Message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  typedMessageForSending!: string;

  @Output()
  sendClick: EventEmitter<EventEmitterObject> = new EventEmitter();



  loggedInUsersUsername!: string;

  loggedInUsersAccount?: Account;

  subscription!: Subscription;

  subscriptionSignalRMessage!: Subscription;

  newSignalRMessages: MessageSignalR[] = [];

  dateWhenMessageReceived!: Date;

  chatWith!: string;

  messages$!: Observable<Message[]>;

  constructor(private uiService: UiService,
              private checkIfLoggedInService: CheckIfLoggedInService,
              private messageService: MessageService,
              private accountService: AccountService)
              {
    this.subscription = uiService.onChatSelected().subscribe(value => {
      this.chatWith = value;
      console.log(this.chatWith);
      this.getAllMessagesForChatGroup(this.loggedInUsersUsername, this.chatWith);
    });

    this.subscriptionSignalRMessage = uiService.onMessageRecieved().subscribe( msg => {
      console.log("stigla poruka")
      this.dateWhenMessageReceived = new Date()
      this.newSignalRMessages.push(msg);
      
    });
   }

  ngOnInit(): void {
    this.loggedInUsersUsername =  this.checkIfLoggedInService.getLoggedInUsersUsername();

    this.getAccount(this.loggedInUsersUsername);

  }


  getAllMessagesForChatGroup(participant1: string, participant2: string) {
    let chatGroup = { participant1 : participant1,  participant2 :  participant2 };
    this.messages$ =  this.messageService.getAllForChatGroup(chatGroup);
  }

  private async getAccount(username: string): Promise<void> {

    await this.accountService.getAccount(username).toPromise().then(
      res => {
        this.loggedInUsersAccount = res;
      }
    );
  }





  send(): void {

    let obj = {
      messageContent: this.typedMessageForSending,
      recieversUsername: this.chatWith
    };

    this.sendClick.emit(obj);

    this.typedMessageForSending = "";
  }




}


