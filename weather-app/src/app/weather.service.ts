import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  throwError,
} from 'rxjs';
import { Weather } from './weather.model';

const API_KEY = '8639b23e3320bcafa3ac0812aa770395';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private sharedData = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {}

  fetchData(city: string) {
    return this.httpClient
      .get<Weather>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  getSharedData(): Observable<string> {
    return this.sharedData.asObservable();
  }

  calculateTimeOfDay(hours: number) {
    let timeOfDay = '';
    if (hours <= 6 && hours > 0) {
      timeOfDay = 'night';
    } else if (hours > 6 && hours <= 12) {
      timeOfDay = 'morning';
    } else if (hours > 12 && hours <= 18) {
      timeOfDay = 'afternoon';
    } else if (hours > 18 && hours <= 24) {
      timeOfDay = 'evening';
    }

    this.sharedData.next(timeOfDay);
  }
}
