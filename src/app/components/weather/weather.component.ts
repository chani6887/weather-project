import { Component } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { Favorite } from '../../models/favorite';
import { forkJoin } from 'rxjs';
import { DailyForecast } from '../../models/forecast.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  weatherNow: any;
  dailyForecasts: DailyForecast[] = [];
  selectedCountry: any;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params['locationKey']) {
      this.getData({ localKey: this.activateRoute.snapshot.params['locationKey'], cityName: this.activateRoute.snapshot.params['cityName'] });
    }
    else
      this.getData({ localKey: "215854", cityName: "Tel Aviv" });
  }

  getData(selectedCountry: Favorite) {
    this.selectedCountry = selectedCountry;
    if (selectedCountry != null) {
      this.locationService.getLocationByKey(selectedCountry.localKey).subscribe(
        (location) => {
          forkJoin([
            this.weatherService.getCurrentWeather(location.Key),
            this.weatherService.getForecast(location.Key),
          ]).subscribe((res) => {
            this.dailyForecasts = res[1].DailyForecasts as DailyForecast[];
            this.dailyForecasts.forEach((element) => {
              element.Date = new Date(element.Date);
            });
            this.weatherNow = res[0][0];
          }, error => {

          })
        },
        (error) => { }
      );
    }
  }

}
