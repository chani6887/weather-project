import { Component, EventEmitter, Output } from '@angular/core';
import { Favorite } from '../../models/favorite';
import { FavoritesService } from '../../services/favorites.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  filteredCountries: any[] = [];
  autocompleteLocation: Map<string, Location[]> = new Map<string, Location[]>();
  lastQuery = ' ';
  selectedCountry: any;

  @Output() onSelectedCountry = new EventEmitter<Favorite>();

  constructor(
    private locationService: LocationService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.autocompleteLocation.set('', []);
  }

  checkLeagalKey(event: any) {
    const englishLetters = /^[A-Za-z]*$/;
    if (!englishLetters.test(event.key)) {
      event.preventDefault();
    }
  }

  selectCountry() {
    if (
      this.autocompleteLocation &&
      this.autocompleteLocation.has(this.lastQuery)
    ) {
      let country = this.autocompleteLocation
        .get(this.lastQuery)
        ?.find((city: any) => city.LocalizedName === this.selectedCountry);
      if (country != null) {
        this.onSelectedCountry.emit({
          localKey: country?.Key,
          cityName: country?.LocalizedName,
        });
      }
    }
  }

  filterCountry(event: any) {
    if (event != undefined) {
      this.lastQuery = event.query;
      if (this.autocompleteLocation.has(event.query)) {
        const locations = this.autocompleteLocation.get(event.query);
        if (locations) {
          this.filteredCountries = locations.map((element: any) => {
            return element['LocalizedName'];
          });
        }
      } else {
        this.locationService.getAutocompleteLocation(event.query).subscribe(
          (locationList) => {
            if (locationList != null && locationList.length > 0) {
              this.autocompleteLocation.set(event.query, locationList);
              if (this.lastQuery == event.query) {
                this.filteredCountries = locationList.map((element) => {
                  return element['LocalizedName'];
                });
              }
            }
          },
          (error) => {
            this.filteredCountries = [];
          }
        );
      }
    }
  }
}
