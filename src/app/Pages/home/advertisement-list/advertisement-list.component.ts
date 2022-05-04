import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

  constructor() { }

  url: string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  ngOnInit(): void {
  }

}
