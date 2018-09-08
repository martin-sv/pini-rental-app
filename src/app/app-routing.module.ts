import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LandingComponent } from './core/landing/landing.component';
import { AuthGuard } from './auth/auth.guard';
import { CheckinComponent } from './checkin/checkin.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'properties', loadChildren: './properties/properties.module#PropertiesModule' },
  { path: 'checkin', component: CheckinComponent },
  { path: 'checkin/:id', component: CheckinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], // TODO: Ver si anda lazy loading
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
