import { QueryOptions } from './../../../Models/QueryOptions';
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

  advCount?: number;

  advertisements$!:Observable<AdvertisementWithItem[]>;


  advertisements?: AdvertisementWithItem[]


  subscription!: Subscription;

  constructor(private advertisementService: AdvertisementService, private uiService: UiService, private sanitizer: DomSanitizer) {
    this.subscription = uiService.onFilterChange().subscribe(filterId => this.applyCategoryFilter(filterId));
  }

  ngOnInit(): void {
    
    this.getAllCount();
   
  }


  async getAllCount() {
    await this.advertisementService.getAllActiveCount().toPromise().then(
      res => {
        this.advCount = res;

        let query = {
          startIndex: 0,
          endIndex: 6
        };

        this.getAllActive(query);
        
      });
  }


  async getAllActive(query: QueryOptions) {
    await this.advertisementService.getAllActive(query).toPromise().then(
      res => {
        this.advertisements = res;
        
      });
  }

  private applyCategoryFilter(filterId: number) {

    let query = {
      startIndex: 0,
      endIndex: 6
    };

    this.advertisementService.getAllActiveCategoryFilter(filterId, query).toPromise().then(
      res => {
                  this.advertisements = res;
                  this.getAllCategoryFilterCount(filterId);

      }
    );
  }

  async getAllCategoryFilterCount(categoryId: number) {
    if (categoryId == -1) {
      await this.advertisementService.getAllActiveCount().toPromise().then(
        res => {
          this.advCount = res; 
        });
    } else {
      await this.advertisementService.getAllActiveCategoryFilterCount(categoryId).toPromise().then(
        res => {
          this.advCount = res; 
        });
    }
   
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
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (this.advCount && endIndex > this.advCount) {
        endIndex = this.advCount;
    }
    let query = {
      startIndex: startIndex,
      endIndex: endIndex
    };
    this.getAllActive(query);
  }

  

  

}
