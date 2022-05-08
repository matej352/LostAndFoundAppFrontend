import { AdvertisementService } from 'src/app/Services/advertisement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  advertisementId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private advertisementService: AdvertisementService) {

   }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id != null) {
        this.advertisementService.getAdvertisement(parseInt(id)).subscribe({
          next: (advertisement) => { 

          },
          error: (msg) => {
            this.router.navigate(["/404"]);
          }
        });


      } else {
        this.router.navigate(["/404"]);
      }
    })
  }

}
