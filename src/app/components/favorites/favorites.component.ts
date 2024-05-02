import { Component, EventEmitter, Output } from '@angular/core';
import { Favorite } from '../../models/favorite';
import { FavoritesService } from '../../services/favorites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  favorites: Favorite[] = [];
  @Output() onSelectedCountry = new EventEmitter<Favorite>();

  constructor(private favoritesService: FavoritesService,
    private router: Router) { }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
  selectCountry(country: Favorite) {
    this.router.navigate(['/weather', country.localKey,country.cityName]);
  }
}
