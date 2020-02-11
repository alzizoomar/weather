import { Component, OnInit } from '@angular/core';
import { WeatherServices } from 'src/app/services/api/weather.service';
import * as moment from 'moment';
import {groupBy} from 'lodash'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

export class ForecastComponent implements OnInit {
  forecast: any;
  forecastList: any;
  cityName: string;
  lastUpdate: any;
  interval: any;
  weatherIcon: string;
  language: string;

  constructor(
    private weatherApi: WeatherServices,
    private translateService: TranslateService,
    private toastr: ToastrService) {}

  ngOnInit() {
    if (localStorage.getItem('forecastLastUpdate'))
    this.interval = setInterval(() => {
      this.lastUpdate = moment(localStorage.getItem('forecastLastUpdate')).startOf("minute").fromNow();
    }, 1000*60);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) =>
    {
      if(event.lang == 'Arabic')
      {
        this.language = 'ar';
      } 
      else
      {
        this.language = 'en';
      }
      if(!!this.cityName) {
        this.getForecast(this.cityName)
      }
    });
  }

  getForecast (cityName) {
    cityName = cityName?cityName:'';
    this.weatherApi.getForecast(cityName, this.language).subscribe(res => {
      if(res) {
        this.forecast = res;
        res['list'].map(item => {
          item.date = moment(item.dt_txt).format('DD MMMM YYYY');
          return item;
        })
        this.forecastList = Object.values(groupBy(res['list'], item => item.date));
        localStorage.setItem('forecastLastUpdate', moment().toISOString());
      }
    }, error => { 
      if (error.status == 404) {
        this.toastr.warning('Enter valid city name !', 'Warning', {timeOut: 10000, positionClass: 'toast-top-right'});
      } else {
        this.toastr.error('Something went wrong, please try again !', 'Erorr', {timeOut: 10000, positionClass: 'toast-top-right'});
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
