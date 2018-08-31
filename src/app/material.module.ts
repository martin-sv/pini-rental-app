import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule
      ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule
      ]
})
export class MaterialModule {

}
