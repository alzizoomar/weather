import { ForecastComponent } from './pages/forecast/forecast.component';
import { CurrentWeatherComponent } from './pages/currentWeather/currentWeather.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { I18nService } from './services/i18n.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './sharedModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {
  MatStepperModule, MatInputModule,
  MatButtonModule, MatAutocompleteModule,
  MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatProgressSpinnerModule } from '@angular/material';
import { WeatherServices } from './services/api/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  providers: [
    WeatherServices,
    I18nService],
  bootstrap: [AppComponent]
})
export class AppModule { }
