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

  chatWithAccount?: Account;

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
    this.subscription = uiService.onChatSelected().subscribe(async value => {

      if (this.chatWith == value) {
        //do nothing
      } else {
        this.chatWith = value;
        console.log(this.chatWith);
        this.getAllMessagesForChatGroup(this.loggedInUsersUsername, this.chatWith);
      }

      //Svakim novim klikom na neki chat zelimo saznati s kim je trenutan chat otvoren
      await this.accountService.getAccount(this.chatWith).toPromise().then( 
        (a) => {
              this.chatWithAccount = a;    
              
               //izfiltriraj signalR poruke koje ne pripadaju u određenu chat grupu sa novokliknutim accountom
               this.newSignalRMessages = this.newSignalRMessages
                  .filter( m => (m.from == this.loggedInUsersUsername && m.recieverId == this.chatWithAccount?.accountId) 
                  || (m.recieverId == this.loggedInUsersAccount?.accountId && m.from == this.chatWithAccount?.username) );
        }
      );

      
    });

   
    this.subscriptionSignalRMessage = uiService.onMessageRecieved().subscribe( msg => {
      console.log("stigla poruka ili jer ju ja poslao ili jer mi ju je neko poslao")
      this.dateWhenMessageReceived = new Date();

      //important, so user dont get messages from api when opening chat and those from signalR

      console.log("1 " + msg.from);
      console.log("2 " + this.loggedInUsersUsername);
      console.log("3 " + msg.recieverId);
      console.log("4 " + this.loggedInUsersAccount?.accountId);


      if (this.chatWith && (msg.from == this.loggedInUsersUsername || msg.recieverId == this.loggedInUsersAccount?.accountId)) {
        this.newSignalRMessages.push(msg);
      }
      
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


