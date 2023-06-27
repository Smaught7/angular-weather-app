import { Component, Input } from '@angular/core';
import { Weather } from '../weather.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent {
  @Input() weatherData!: Weather;
  @Input() timezoneOffset!: string | null;
}
