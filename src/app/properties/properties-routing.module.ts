import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyCreateEditComponent } from './property-create-edit/property-create-edit.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  // { path: 'properties', component: PropertyListComponent },
  { path: '', component: PropertyListComponent, canActivate: [AuthGuard] },
  { path: 'addproperty', component: PropertyCreateEditComponent },
  { path: ':id', component: PropertyDetailsComponent }

  // { path: 'properties/:id', component: PropertyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule {}
