import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public data!: Weather;
  public city = 'Warsaw';
  public warsawTimezoneOffset = 7200;

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
    if (this.data && this.data.timezone) {
      const currentDate = new Date();
      const timezoneOffset =
        this.data.timezone / 3600 - this.warsawTimezoneOffset / 3600;

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
    this.weatherService.fetchData(this.city).subscribe((data) => {
      this.data = data;
      console.log(this.data);
      this.setDateFromTimezone();
    });
  }
}
