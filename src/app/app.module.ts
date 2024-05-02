import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { ImageModule } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { FormsModule } from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';
import {SelectButtonModule} from 'primeng/selectbutton';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ErrorInterceptor } from './services/_interceptors/error.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    WeatherComponent,
    ForecastComponent,
    FavoritesComponent
  ],
  imports: [
    ToastModule,
    SidebarModule,
    ButtonModule,
    TieredMenuModule,
    MenubarModule,
    SelectButtonModule,
    FormsModule,
    InputSwitchModule,
    ImageModule,
    MenuModule,
    DataViewModule,
    AutoCompleteModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [MessageService,{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
