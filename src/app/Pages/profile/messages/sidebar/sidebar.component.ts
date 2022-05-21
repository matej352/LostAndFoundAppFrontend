import { UiService } from './../../../../Services/ui.service';
import { MessageGroup } from './../../../../Models/MessageGroup';
import { Observable } from 'rxjs';
import { MessageService } from './../../../../Services/message.service';
import { Component, Input, OnInit } from '@angular/core';
import { CheckIfLoggedInService } from 'src/app/Services/check-if-logged-in.service';
import { Message } from 'src/app/Models/Message';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loggedInUsersUsername!: string;

  groups$!: Observable<MessageGroup[]>;

  constructor( private checkIfLoggedInService: CheckIfLoggedInService, private messageService: MessageService, private uiService: UiService) { }

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
  

}

