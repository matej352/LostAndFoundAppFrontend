import { AccountUpdateDTO } from './../DTOs/AccountUpdateDTO';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './../Models/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient) { }

  private restApiUrl = "https://localhost:44326"; 


  getAccount(username: string): Observable<Account> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.get<Account>( `${this.restApiUrl}/account/${username}`, {headers : headers});
  }

  updateAccount(account: AccountUpdateDTO): Observable<any> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    //const params = new HttpParams().append(account);

    return this.http.put<any>( `${this.restApiUrl}/account/${account.username}`, account, {headers : headers});
  }

}
