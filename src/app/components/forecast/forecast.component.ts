import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Favorite } from '../../models/favorite';
import { LocationService } from '../../services/location.service';
import { FavoritesService } from '../../services/favorites.service';
import { DailyForecast, Forecast } from '../../models/forecast.model';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent {

  @Input() dailyForecasts: DailyForecast[] = [];
  @Input() weatherNow: any;
  isFavorite: boolean = false;
  favorite: any;
  @Input() selectedCountry!: Favorite;
  dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  foreCastMap: Forecast[] = [];

  constructor(private favoritesService: FavoritesService,
    private locationService: LocationService,
    private ref: ChangeDetectorRef,
    private weatherService: WeatherService,
    ) { }

  ngOnChanges(): void {
    this.checkInFavorite();
  }

  ngOnInit(): void {
  }

  checkInFavorite() {
    if (this.selectedCountry != null) {
      var result = this.favoritesService.getFavoriteByKey(this.selectedCountry.localKey);
      if (result)
        this.isFavorite = true;
      else this.isFavorite = false;
      this.ref.detectChanges();
    }
  }

  addToFavorite() {
    if (this.selectedCountry != null) {
      this.favorite = new Favorite();
      this.favorite.localKey = this.selectedCountry.localKey;
      this.favorite.cityName = this.selectedCountry.cityName;
      if (this.favoritesService.addToFavorite(this.favorite))
        this.isFavorite = true;
      this.ref.detectChanges();
    }
  }

  remove() {
    if (this.favoritesService.removeFavorite(this.favorite.localKey))
      this.isFavorite = false;
    this.ref.detectChanges();
  }

  getTemperature(value: number) {
    if (value) {
      if (this.weatherService.isMetric) {
        return value + ' C'
      }
      return Math.round(value * 5 / 9 + 32).toString() + ' F';
    }
    return "C";
  }

}
