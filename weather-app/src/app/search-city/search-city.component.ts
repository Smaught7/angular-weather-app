import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements AfterViewInit, OnDestroy {
  @Output() newItemEvent = new EventEmitter<string>();
  private destroy$ = new Subject<void>();
  public cityName = '';
  public timeOfDay!: string;

  constructor(
    public weatherService: WeatherService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.weatherService
      .getSharedData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.timeOfDay = data;
        this.cdRef.detectChanges(); //to pewnie do poprawy
      });
  }

  onSubmit() {
    this.newItemEvent.emit(this.cityName);
    this.cityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
