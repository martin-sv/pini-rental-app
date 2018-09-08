import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HostComponent } from './host/host.component';
import { GuestsPastComponent } from './guests/guests-past/guests-past.component';
import { GuestsFutureComponent } from './guests/guests-future/guests-future.component';
import { GuestsListComponent } from './guests/guests-list/guests-list.component';

import { AuthService } from './auth/auth.service';
import { FirestoreService } from './shared/firestore.service';
import { UIService } from './shared/ui.service';
import { PropertiesService } from './properties/properties.service';
import { DataService } from './shared/data.service';
import { CheckinsService } from './checkin/checkins.service';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { reducers } from './app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { CheckinComponent } from './checkin/checkin.component';
import { SharedModule } from './shared/shared.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    DashboardComponent,
    GuestsPastComponent,
    GuestsFutureComponent,
    GuestsListComponent,
    CheckinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects]),
    // PropertiesModule
    SharedModule
  ],
  providers: [
    PropertiesService,
    AuthService,
    FirestoreService,
    UIService,
    DataService,
    CheckinsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
