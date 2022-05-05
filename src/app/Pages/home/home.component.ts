import { AdvertisementService } from './../../Services/advertisement.service';
import { AdvertisementWithItem } from './../../Models/AdvertisementWithItem';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  advertisements$!:Observable<AdvertisementWithItem[]>;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
      this.advertisements$ = this.advertisementService.getAllActive();
  }

}
