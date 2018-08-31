import { NgModule } from '@angular/core';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyCreateEditComponent } from './property-create-edit/property-create-edit.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PropertyCreateEditComponent,
    PropertyListComponent,
    PropertyDetailsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
  ],
  exports: []
})
export class PropertiesModule {

}
