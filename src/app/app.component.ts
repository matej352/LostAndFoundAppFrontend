import { ResponsivityService } from './Services/responsivity.service';
import { Component } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LostAndFoundAppFrontend';
  mediaSubscription!: Subscription;
  deviceXs!: boolean;
  constructor(private responsivityService: ResponsivityService) {
        this.mediaSubscription = responsivityService.onchange().subscribe(boolValue => this.deviceXs = boolValue);

  }

   ngOnInit() {}
   ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

}
