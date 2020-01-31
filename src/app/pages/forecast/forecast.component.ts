import { Component, OnInit } from '@angular/core';
import { WeatherServices } from 'src/app/services/api/weather.service';
import * as moment from 'moment';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

export class ForecastComponent implements OnInit {
  forecast: any;
  cityName: string;
  lastUpdate: any;
  interval: any;
  weatherIcon: string;

  constructor(private weatherApi: WeatherServices) {}

  ngOnInit() {
    if (localStorage.getItem('forecastLastUpdate'))
    this.interval = setInterval(() => {
      this.lastUpdate = moment(localStorage.getItem('forecastLastUpdate')).startOf("minute").fromNow();
    }, 1000*60);
  }

  getForecast (cityName) {
    this.weatherApi.getForecast(cityName).subscribe(res => {
      if(res) {
        this.forecast = res;
        localStorage.setItem('forecastLastUpdate', moment().toISOString());
      }
    })
  }

  onSubmit(mForm: any) {
    if (mForm.valid) {
      this.getForecast(this.cityName)
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
