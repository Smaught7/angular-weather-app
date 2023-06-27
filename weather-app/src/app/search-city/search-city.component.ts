import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.sass'],
})
export class SearchCityComponent {
  public cityName = '';

  constructor(public weatherService: WeatherService) {}

  onSubmit() {
    this.cityName = '';
  }
}
