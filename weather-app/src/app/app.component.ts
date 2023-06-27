import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public weatherData!: Weather;
  public city = 'Warsaw';
  private readonly warsawTimezoneOffset = 7200;
  isLoading = false;
  error = new Subject<string | null>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
    this.setDateFromTimezone();
  }

  setCity(city: string) {
    this.city = city;
    this.fetchWeatherData();
  }

  setDateFromTimezone() {
    if (this.weatherData && this.weatherData.timezone) {
      const currentDate = new Date();
      const timezoneOffset =
        this.weatherData.timezone / 3600 - this.warsawTimezoneOffset / 3600;

      const timeOffsetDate = currentDate.getHours() + timezoneOffset;

      if (timeOffsetDate < 0) {
        const offsetFromMidnight = 24 + timeOffsetDate;
        return `${offsetFromMidnight}:${currentDate.getMinutes()}`;
      }

      return `${timeOffsetDate}:${currentDate.getMinutes()}`;
    }

    return null;
  }

  private fetchWeatherData() {
    this.weatherService.fetchData(this.city).subscribe(
      (data) => {
        this.isLoading = false;
        this.weatherData = data;
        this.setDateFromTimezone();
      },
      (error) => {
        this.isLoading = false;
        console.log(error.message);
        this.error.next(error.message);
      }
    );
  }
}
