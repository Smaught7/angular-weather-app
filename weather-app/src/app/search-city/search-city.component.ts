import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent implements OnInit, OnDestroy {
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() error!: Subject<string | null>;

  private destroy$ = new Subject<void>();
  public errorMessage!: string | null;
  public cityName = '';
  public isErrorClosed = false;

  constructor(public weatherService: WeatherService) {}

  ngOnInit(): void {
    this.error?.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.errorMessage = error;
    });
    this.weatherService
      .getIsErrorClose()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.isErrorClosed = data;
        this.errorMessage = '';
        this.disabledInputDuringError();
      });
  }

  disabledInputDuringError() {
    if (this.errorMessage) {
      return !this.isErrorClosed;
    } else {
      return (this.isErrorClosed = false);
    }
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
