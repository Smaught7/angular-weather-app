import { Component, Input } from '@angular/core';
import { Weather } from 'src/app/weather.model';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent {
  @Input() weatherData?: Weather;
  @Input() errorMessage!: string | null;
  @Input() isLoading!: boolean;
  public isClose = true;

  constructor(public weatherService: WeatherService) {}

  onHandleError() {
    this.errorMessage = null;
    this.isClose = !this.isClose;
    this.weatherService.setIsErrorClose(this.isClose);
  }
}
