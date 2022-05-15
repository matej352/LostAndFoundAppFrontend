import { AdvertisementService } from './../../Services/advertisement.service';
import { AdvertisementWithItem } from './../../Models/AdvertisementWithItem';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ResponsivityService } from 'src/app/Services/responsivity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mediaSubscription!: Subscription;
  deviceXs: boolean = false;
  public screenWidth: any;

  advertisements$!: Observable<AdvertisementWithItem[]>;

  constructor(
    private advertisementService: AdvertisementService,
    private responsivityService: ResponsivityService
  ) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <=  550 ) {
      this.deviceXs = true;
    }

    this.mediaSubscription = responsivityService
      .onchange()
      .subscribe((boolValue) => (this.deviceXs = boolValue));
  }

  ngOnInit(): void {
    this.advertisements$ = this.advertisementService.getAllActive();
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  topVal = 0;
  onScroll(e: any) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }
}
