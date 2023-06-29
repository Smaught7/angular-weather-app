import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Weather } from '../weather.model';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-information',
  templateUrl: './weather-information.component.html',
  styleUrls: ['./weather-information.component.scss'],
})
export class WeatherInformationComponent implements OnInit, OnDestroy {
  @Input() weatherData!: Weather;
  @Input() isLoading!: boolean;
  @Input() error!: Subject<string | null>;

  public errorMessage!: string | null;
  private destroy$ = new Subject<void>();
  private readonly warsawTimezoneOffset = 7200;
  public showDetails = false;

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.error.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error;
    });
  }

  setDateFromTimezone() {
    if (this.weatherData && this.weatherData.timezone) {
      const currentDate = new Date();
      const timezoneOffset =
        this.weatherData.timezone / 3600 - this.warsawTimezoneOffset / 3600;

      const timeOffsetDate = currentDate.getHours() + timezoneOffset;

      if (timeOffsetDate < 0) {
        const offsetFromMidnight = 24 + timeOffsetDate;
        this.weatherService.calculateTimeOfDay(offsetFromMidnight);

        return `${offsetFromMidnight.toString().padStart(2, '0')}:${currentDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;
      }

      this.weatherService.calculateTimeOfDay(timeOffsetDate);
      return `${timeOffsetDate.toString().padStart(2, '0')}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }

    return null;
  }

  onHandleError() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}