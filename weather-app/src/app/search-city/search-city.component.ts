import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent {
  @Output() newItemEvent = new EventEmitter<string>();
  public cityName = '';

  constructor(public weatherService: WeatherService) {}

  onSubmit() {
    this.newItemEvent.emit(this.cityName);
    this.cityName = '';
  }
}
