import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Weather } from '../weather.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
})
export class WeatherDetailsComponent implements OnInit, OnDestroy {
  @Input() weatherData!: Weather;
  @Input() timezoneOffset!: string | null;
  @Input() isLoading!: boolean;
  @Input() error!: Subject<string | null>;

  public errorMessage!: string | null;
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.error.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
