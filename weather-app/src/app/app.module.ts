import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { FormsModule } from '@angular/forms';
import { WeatherInformationComponent } from './weather-information/weather-information.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    WeatherInformationComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
