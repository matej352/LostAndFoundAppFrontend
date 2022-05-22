import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-location-publish',
  templateUrl: './location-publish.component.html',
  styleUrls: ['./location-publish.component.css']
})
export class LocationPublishComponent implements OnInit {

  map!: google.maps.Map;


  @Output()
  coordinationsSelected = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

    
    const loader = new Loader({
      apiKey: 'AIzaSyATW_9VmerihE-nS4dGVKkPCSadqROF9eQ',
    });


    const mapOptions = {
      center: {
        lat: 45.815399,
        lng: 15.966568,
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
          map: this.map,
        });

        //click on map changes marker postition to clicked postition
        this.map.addListener('click', (mapsMouseEvent: any) => {
          marker.setPosition(mapsMouseEvent.latLng);

          let obj = mapsMouseEvent.latLng.toJSON();

          this.coordinationsSelected.emit(obj);

          console.log(obj)


        });
        
      })
      .catch((e) => {
        // do something
      });
  }


}
