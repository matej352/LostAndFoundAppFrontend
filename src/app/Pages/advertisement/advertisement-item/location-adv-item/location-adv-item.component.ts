import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-location-adv-item',
  templateUrl: './location-adv-item.component.html',
  styleUrls: ['./location-adv-item.component.css']
})
export class LocationAdvItemComponent implements OnInit {

  @Input()
  lat!: number;

  @Input()
  lng!: number;

  map!: google.maps.Map;

  constructor() {}

  ngOnInit(): void {

    const loader = new Loader({
      apiKey: 'AIzaSyATW_9VmerihE-nS4dGVKkPCSadqROF9eQ',
    });


    const mapOptions = {
      center: {
        lat: this.lat,
        lng: this.lng,
      },
      zoom: 8,
    };

    loader
      .load()
      .then((google) => {
        this.map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          mapOptions
        );

        const marker = new google.maps.Marker({
          position: {
            lat: this.lat,
            lng: this.lng,
          },
          map: this.map,
        });
      })
      .catch((e) => {
        console.log("eo me")
        // do something
      });
  }

}
