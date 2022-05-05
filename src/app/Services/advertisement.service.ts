import { AdvertisementWithItem } from './../Models/AdvertisementWithItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }


  getAllActive(): Observable<AdvertisementWithItem[]> {
    return this.http.get<AdvertisementWithItem[]>( `${this.restApiUrl}/advertisement`);
  }


}
