import { UiService } from './../../../Services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { AdvertisementService } from 'src/app/Services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  advertisements$!:Observable<AdvertisementWithItem[]>;

  subscription!: Subscription;

  constructor(private advertisementService: AdvertisementService, private uiService: UiService) {
    this.subscription = uiService.onFilterChange().subscribe(filterId => this.applyCategoryFilter(filterId));
  }

  url: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  ngOnInit(): void {
    this.advertisements$ = this.advertisementService.getAllActive();
  }

  private applyCategoryFilter(filterId: number) {
    console.log(filterId);
    this.advertisements$ = this.advertisementService.getAllActiveCategoryFilter(filterId);
  }

}
