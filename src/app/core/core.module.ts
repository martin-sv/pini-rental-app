import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidenavListComponent
  ]
})
export class CoreModule {}
