import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CurrentWeather } from '../models/currentWeather.model';
import { Forecast } from '../models/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  isMetric = true;
  temperatureUnitChanged = new Subject<null>();
  constructor(private httpClient: HttpClient) {}

  getForecast(locationKey: string): Observable<Forecast> {
    const isMetric = this.isMetric ? 'true' : 'false';
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);
    // params = params.append('metric', isMetric);
    return this.httpClient.get<Forecast>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params });
  }

  getCurrentWeather(locationKey: string): Observable<CurrentWeather[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);
    return this.httpClient.get<CurrentWeather[]>(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params });
  }


}
