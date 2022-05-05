import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subject, Subscription, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsivityService {

  mediaSub!: Subscription;

  private deviceXs = new Subject<boolean>();

  constructor(private mediaObserver: MediaObserver) { 
    this.mediaSub = this.mediaObserver.asObservable().subscribe((res: MediaChange[]) => {
      this.deviceXs.next(res[0].mqAlias === "xs" ? true : false);
    })
  }

  onchange(): Observable<boolean> {
    return this.deviceXs.asObservable()
  }


 


}
