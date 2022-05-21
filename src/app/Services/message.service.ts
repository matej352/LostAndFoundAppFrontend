import { GroupParticipantsDTO } from './../DTOs/GroupParticipantsDTO';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../Models/Message';
import { MessageGroup } from '../Models/MessageGroup';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }

  
  getAll(username: string): Observable<Message[]> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.get<Message[]>( `${this.restApiUrl}/Message/GetAll/{username}`, {headers : headers});

  }

  getChatGroups(username: string): Observable<MessageGroup[]> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    return this.http.get<MessageGroup[]>( `${this.restApiUrl}/Message/GetGroups/` + username, {headers : headers});

  }


  getAllForChatGroup(group: GroupParticipantsDTO): Observable<Message[]> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.post<Message[]>( `${this.restApiUrl}/Message/GetAllForGroup`, group, {headers : headers});

  }




}
