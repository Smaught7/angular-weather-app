import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  private city = 'Warsaw';
  isLoading = false;
  error = new Subject<string | null>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  setCity(city: string) {
    this.city = city;
    this.fetchWeatherData();
  }

  private fetchWeatherData() {
    this.isLoading = true;
    this.weatherService.fetchData(this.city).subscribe(
      (data) => {
        this.isLoading = false;
        this.weatherData = data;
      },
      (error) => {
        this.isLoading = false;
        this.error.next(error.message);
      }
    );
  }
}
