import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor() {
  }

  addToFavorite(favorite: Favorite) {
    try {
      var favorites = this.getFavorites();
      favorites.push(favorite);
      localStorage.setItem("Favorites", JSON.stringify(favorites));
      return true;
    } catch (error) {
      return false;
    }
  }

  getFavorites(): Favorite[] {
    var l = localStorage.getItem("Favorites");
    if (l != null)
      return JSON.parse(l) || [];
    return [];
  }

  getFavoriteByKey(key: string) {
    return this.getFavorites().find(p => p.localKey == key);
  }

  removeFavorite(localKey: string) {

    try {
      var favorites = this.getFavorites();
      var findIndex = favorites.findIndex(p => p.localKey == localKey);
      if (findIndex >= 0) {
        favorites = favorites.splice(findIndex, 1);
      }
      localStorage.setItem("Favorites", JSON.stringify(favorites));
      return true;
    } catch (error) {
      return false;
    }
  }
}
