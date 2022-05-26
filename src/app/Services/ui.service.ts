import { Message } from './../Models/Message';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageSignalR } from '../Models/MessageSignalR';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  private subject = new Subject<any>();

  private subjectForNavigation = new Subject<any>();

  private subjectForChat = new Subject<any>();

  private subcjetForNewSignalRMessage = new Subject<MessageSignalR>();


  categoryFilter(categoryId: number): void {
    this.subject.next(categoryId);
  }

  onFilterChange(): Observable<any> {
    return this.subject.asObservable();
  }




  userLoggedIn(): void {
    this.subjectForNavigation.next(true);
  }

  onUserLoggIn(): Observable<any> {
    return this.subjectForNavigation.asObservable();
  }



  chatSelected(chatWith: string): void {
    this.subjectForChat.next(chatWith);
  }

  onChatSelected(): Observable<any> {
    return this.subjectForChat.asObservable();
  }



  messageSent(msg: MessageSignalR): void {
    this.subcjetForNewSignalRMessage.next(msg);
  }

  onMessageRecieved(): Observable<MessageSignalR> {
    return this.subcjetForNewSignalRMessage.asObservable();
  }




}
