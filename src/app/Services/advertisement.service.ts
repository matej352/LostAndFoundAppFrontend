import { AdvertisementCreateDTO } from './../DTOs/AdvertisementCreateDTO';
import { Image } from './../Models/Image';
import { AdvertisementWithItem } from './../Models/AdvertisementWithItem';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, catchError, throwError } from 'rxjs';
import { Advertisement } from '../Models/Advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }


  getAllActive(): Observable<AdvertisementWithItem[]> {
    return this.http.get<AdvertisementWithItem[]>( `${this.restApiUrl}/advertisement`);
  }

  getAllFromUser(username: string): Observable<AdvertisementWithItem[]> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    return this.http.get<AdvertisementWithItem[]>( `${this.restApiUrl}/Advertisement/GetAdvertisementsFromUser/${username}`, {headers : headers});
  }


  getAllActiveCategoryFilter(categoryId: number): Observable<AdvertisementWithItem[]> {

    if (categoryId == -1) {
        return this.getAllActive();
    } else {
      return this.http.get<AdvertisementWithItem[]>( `${this.restApiUrl}/Advertisement/GetAdvertisementsCategoryFilter/${categoryId}`);
    }
  }

  getAdvertisementWithItem(advertisementId: number): Observable<AdvertisementWithItem> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})
    return this.http.get<AdvertisementWithItem>( `${this.restApiUrl}/Advertisement/GetAdvertisementWithItem/${advertisementId}`, {headers : headers});
  }

  getImageOfItem(itemId: number): Observable<Image>{

    const params = new HttpParams().append('itemId', itemId);

    return this.http.get<Image>( `${this.restApiUrl}/Image`, {params : params})
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        return throwError(err);    //Rethrow it back to component
      })
    )
  }

  getAdvertisement(advertisementId: number): Observable<Advertisement> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    const params = new HttpParams().append('param', advertisementId);

    return this.http.get<Advertisement>( `${this.restApiUrl}/advertisement`, {headers : headers, params : params});
  }


  changeAdvStatus(advertisementId: number): Observable<void> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.put<void>( `${this.restApiUrl}/advertisement/${advertisementId}`, advertisementId, {headers : headers});
  }


  create(newAdvertisement: AdvertisementCreateDTO, username: string): Observable<Advertisement> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${localStorage.getItem('jwt')}`})

    return this.http.post<Advertisement>( `${this.restApiUrl}/advertisement/${username}`, newAdvertisement, {headers : headers});
  }


}
