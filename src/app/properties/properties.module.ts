import { NgModule } from '@angular/core';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyCreateEditComponent } from './property-create-edit/property-create-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PropertyCreateEditComponent,
    PropertyListComponent,
    PropertyDetailsComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class PropertiesModule {

}
