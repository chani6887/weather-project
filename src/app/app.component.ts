import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoaderService } from './services/loader.service';
import { WeatherService } from './services/weather.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  items: MenuItem[] | undefined;
  valueUnit: string = "C";
  displayLoading = false;
  unitOptions: any[] = [{ label: 'C', value: 'C' }, { label: 'F', value: 'F' }];
  sidebarVisible: boolean = false;
  isDarkMode: boolean = false;

  constructor(private loaderService: LoaderService,
    private weatherService: WeatherService,
    private themeService: ThemeService) { }

  ngOnInit() {

    this.items = [
      {
        label: 'Search',
        icon: 'pi pi-search',
        routerLink: 'weather'
      },
      {
        label: 'Favorites',
        icon: 'pi pi-heart',
        routerLink: 'favorites'
      }
    ];

    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
  }

  valueThemeChange() {
    console.log(this.isDarkMode);
    this.themeService.switchTheme(this.isDarkMode ? "bootstrap4-dark-blue" : "saga-blue");
  }

  changeTemperatureUnit() {
    debugger;
    this.weatherService.isMetric = !this.weatherService.isMetric;
    this.weatherService.temperatureUnitChanged.next(null);
  }
}
