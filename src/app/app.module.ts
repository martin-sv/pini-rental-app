import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostComponent } from './host/host.component';
import { GuestsPastComponent } from './guests/guests-past/guests-past.component';
import { GuestsFutureComponent } from './guests/guests-future/guests-future.component';
import { GuestsListComponent } from './guests/guests-list/guests-list.component';

import { AuthService } from './auth/auth.service';
import { FirestoreService } from './shared/firestore.service';
import { UIService } from './shared/ui.service';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    HostComponent,
    DashboardComponent,
    LandingComponent,
    GuestsPastComponent,
    GuestsFutureComponent,
    GuestsListComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
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
    AuthModule,
    PropertiesModule
  ],
  providers: [
    AuthService,
    FirestoreService,
    UIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
