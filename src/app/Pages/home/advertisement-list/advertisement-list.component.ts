import { UiService } from './../../../Services/ui.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdvertisementWithItem } from 'src/app/Models/AdvertisementWithItem';
import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  advCount: number = 0;

  advertisements$!:Observable<AdvertisementWithItem[]>;


  advertisements!: AdvertisementWithItem[]


  subscription!: Subscription;

  constructor(private advertisementService: AdvertisementService, private uiService: UiService, private sanitizer: DomSanitizer) {
    this.subscription = uiService.onFilterChange().subscribe(filterId => this.applyCategoryFilter(filterId));
  }

  ngOnInit(): void {
    this.advertisements$ = this.advertisementService.getAllActive();
   
  }

  private applyCategoryFilter(filterId: number) {
    this.advertisements$ = this.advertisementService.getAllActiveCategoryFilter(filterId);
  }

  public prepareSource(data: string): SafeResourceUrl {
    const imagePath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data);
    return imagePath;
  }

  //get first 29 words of description to show
  public prepareShortDescription(description: string): string {
    var shortDescription;
    if (description.split(" ").length >= 30) {
      var index = this.getCharCount(description);
      shortDescription = description.substring(0, description.indexOf(" ", index)) + "...";
    } else {
      shortDescription = description;
    }

    return shortDescription;
  }
  
  
  getCharCount(description: string): number {
    var array = description.split(" ");
    var counter = 0;

    var till30 = 0;
    for (const word of array) {
      till30++;
      if (till30 == 30) {
        break;
      }
      counter++;
      var chars = word.split('');
      for (const char of chars) {
           counter++;
      }
         
    }
    counter--;
   
    return counter;
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

  

}
