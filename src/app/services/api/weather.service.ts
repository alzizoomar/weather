import { Injectable } from "@angular/core";


import { HttpClient } from "@angular/common/http";
import { BaseApiService } from '../baseAPI';


@Injectable()
export class WeatherServices extends BaseApiService<any> {

    constructor(http: HttpClient) {
        super(http);
    }

    getCurrentWeather (city: string, language:string) {
        return this.http
            .get(this.baseUrl + this.url + `weather?q=${city}&APPID=${this.APPID}&units=metric&lang=${language}`)
    }

    getForecast (city: string, language:string) {
        return this.http
            .get(this.baseUrl + this.url + `forecast?q=${city}&APPID=${this.APPID}&units=metric&lang=${language}`)
    }
}


