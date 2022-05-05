import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { AdvertisementService } from 'src/app/Services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  advertisements$!:Observable<AdvertisementWithItem[]>;

  constructor(private advertisementService: AdvertisementService) { }

  url: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  ngOnInit(): void {
    this.advertisements$ = this.advertisementService.getAllActive();
  }

}
