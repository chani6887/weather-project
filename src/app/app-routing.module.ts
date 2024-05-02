import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {
    path: 'weather',
    component: WeatherComponent,
  },
  {
    path: 'weather/:locationKey/:cityName',
    component: WeatherComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
