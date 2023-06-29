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
  @Input() weatherData?: Weather;
  @Input() isLoading!: boolean;
  @Input() error!: Subject<string | null>;

  public errorMessage!: string | null;
  private destroy$ = new Subject<void>();

  constructor(public weatherService: WeatherService) {}

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
