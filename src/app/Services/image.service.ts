import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }


  create(formData: FormData, itemId?: number): Observable<void> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    if (itemId) {
      var params = new HttpParams().append('itemId', itemId);
      return this.http.post<void>( `${this.restApiUrl}/Image`, formData, {headers : headers, params : params});
    } 
    return this.http.post<void>( `${this.restApiUrl}/Image`, formData, {headers : headers});
  }
}
