import {Component, OnInit, OnDestroy} from '@angular/core';
import { WeatherServices } from 'src/app/services/api/weather.service';
import * as moment from 'moment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';


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
  language: string;

  constructor(
    private weatherApi: WeatherServices,
    private translateService: TranslateService,
    private toastr: ToastrService) {}

  ngOnInit() {
    if (localStorage.getItem('weatherLastUpdate'))
    this.interval = setInterval(() => {
      this.lastUpdate = moment(localStorage.getItem('weatherLastUpdate')).startOf("minute").fromNow();
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
        this.getCurrentWeather(this.cityName)
      }
    });
  }

  getCurrentWeather (cityName) {
    cityName = cityName?cityName:'';
    this.weatherApi.getCurrentWeather(cityName, this.language).subscribe(res => {
      if(res) {
        this.currentWeather = res;
        this.weatherIcon = `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`
        localStorage.setItem('weatherLastUpdate', moment().toISOString());
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
      this.getCurrentWeather(this.cityName)
    }
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
