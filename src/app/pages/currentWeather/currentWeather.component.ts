import {Component, OnInit, OnDestroy} from '@angular/core';
import { WeatherServices } from 'src/app/services/api/weather.service';
import * as moment from 'moment';


@Component({
  selector: 'app-currentWeather',
  templateUrl: './currentWeather.component.html',
  styleUrls: ['./currentWeather.component.scss']
})

export class CurrentWeatherComponent implements OnInit, OnDestroy {
  currentWeather: any;
  cityName: string;
  lastUpdate: any;
  interval: any;
  weatherIcon: string;

  constructor(private weatherApi: WeatherServices) {}

  ngOnInit() {
    if (localStorage.getItem('weatherLastUpdate'))
    this.interval = setInterval(() => {
      this.lastUpdate = moment(localStorage.getItem('weatherLastUpdate')).startOf("minute").fromNow();
    }, 1000*60);
  }

  getCurrentWeather (cityName) {
    cityName = cityName?cityName:'';
    this.weatherApi.getCurrentWeather(cityName).subscribe(res => {
      if(res) {
        this.currentWeather = res;
        this.weatherIcon = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`
        localStorage.setItem('weatherLastUpdate', moment().toISOString());
      }
    })
  }

  onSubmit(mForm: any) {
    if (mForm.valid) {
      this.getCurrentWeather(this.cityName)
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
