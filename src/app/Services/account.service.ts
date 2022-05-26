import { QueryOptions } from './../Models/QueryOptions';
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

  getAllAccounts(query: QueryOptions): Observable<Account[]> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    const params = new HttpParams().append('start', query.startIndex).append('end', query.endIndex);
    
    return this.http.get<Account[]>( `${this.restApiUrl}/account`, {headers : headers, params : params});
  }

  getAllAccountsCount(): Observable<number> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    return this.http.get<number>( `${this.restApiUrl}/account/count`, {headers : headers});
  }

  getAccountById(id: number): Observable<Account> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.get<Account>( `${this.restApiUrl}/Account/GetAccountById/${id}`, {headers : headers});
  }

  updateAccount(account: AccountUpdateDTO): Observable<any> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    //const params = new HttpParams().append(account);

    return this.http.put<any>( `${this.restApiUrl}/account/${account.username}`, account, {headers : headers});
  }


  saveConnId(connId: string, username: string): Observable<void> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    let obj = {
      connId: connId
    }
    
    return this.http.put<any>( `${this.restApiUrl}/account/SaveConnectionId/${username}`, obj, {headers : headers});
  }

  getConnId(accId: number): Observable<any> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.get<any>( `${this.restApiUrl}/account/GetConnectionId/${accId}`, {headers : headers});
  }

}
