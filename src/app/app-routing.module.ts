import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './core/landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';
import { AuthGuard } from './auth/auth.guard';
import { PropertyDetailsComponent } from './properties/property-details/property-details.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'properties', component: PropertyListComponent, canActivate: [AuthGuard] },
  { path: 'properties/:id', component: PropertyDetailsComponent }
];
// TODO: Agregar logica 404

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
