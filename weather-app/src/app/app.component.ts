import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subject } from 'rxjs';
import { Weather } from './weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  public data!: Weather;
  public city = 'Warsaw';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.fetchData(this.city).subscribe((data) => {
      this.data = data;
    });
  }
}
