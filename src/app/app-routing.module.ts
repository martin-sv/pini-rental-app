import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { PropertyListComponent } from './properties/property-list/property-list.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'properties', component: PropertyListComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signin', component: SigninComponent},
];
// TODO: Agregar logica 404

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
