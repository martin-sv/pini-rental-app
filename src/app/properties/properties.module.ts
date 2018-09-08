import { NgModule } from '@angular/core';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyCreateEditComponent } from './property-create-edit/property-create-edit.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesRoutingModule } from './properties-routing.module';
import { StoreModule } from '@ngrx/store';
import { propertiesReducer } from './store/properties.reducer';

@NgModule({
  declarations: [
    PropertyCreateEditComponent,
    PropertyListComponent,
    PropertyDetailsComponent
  ],
  imports: [
    PropertiesRoutingModule,
    SharedModule,
    StoreModule.forFeature('properties', propertiesReducer)
  ]
})
export class PropertiesModule {

}
