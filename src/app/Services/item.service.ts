import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../Models/Item';
import { Observable } from 'rxjs';
import { ItemCreateDTO } from '../DTOs/ItemCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }


  create(newItem: ItemCreateDTO): Observable<Item> {

    if (newItem.findingDate) {
     console.log(newItem.findingDate)
    } else {
      newItem.lossDate
    }

    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.post<Item>( `${this.restApiUrl}/Item`, newItem, {headers : headers});
  }


}
