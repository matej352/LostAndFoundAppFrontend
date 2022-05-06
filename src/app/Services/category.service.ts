import { Category } from './../Models/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private restApiUrl = "https://localhost:44326"; 

  constructor(private http: HttpClient) { }


  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>( `${this.restApiUrl}/category`);
  }





}
