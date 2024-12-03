import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface ISharedData {
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private filterDataSubject = new BehaviorSubject<ISharedData | null>(null);

  setFilterData(filterData: ISharedData | null): void {
    this.filterDataSubject.next(filterData);
  }

  getFilterData(): Observable<ISharedData | null> {
    return this.filterDataSubject.asObservable();
  }
}
