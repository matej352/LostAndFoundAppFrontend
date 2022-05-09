import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() { }

  private subject = new Subject<any>();

  categoryFilter(categoryId: number): void {
    this.subject.next(categoryId);
  }

  onFilterChange(): Observable<any> {
    return this.subject.asObservable();
  }

}
