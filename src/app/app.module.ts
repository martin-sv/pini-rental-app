import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HostComponent } from './host/host.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { GuestsPastComponent } from './guests/guests-past/guests-past.component';
import { GuestsFutureComponent } from './guests/guests-future/guests-future.component';
import { GuestsListComponent } from './guests/guests-list/guests-list.component';
import { PropertyCreateEditComponent } from './properties/property-create-edit/property-create-edit.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';
import { PropertyDetailsComponent } from './properties/property-details/property-details.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HostComponent,
    DashboardComponent,
    LandingComponent,
    GuestsPastComponent,
    GuestsFutureComponent,
    GuestsListComponent,
    PropertyCreateEditComponent,
    PropertyListComponent,
    PropertyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
