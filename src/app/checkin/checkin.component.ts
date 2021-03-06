import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertiesService } from '../properties/properties.service';
import { FirestoreService } from '../shared/firestore.service';
import { CheckIn } from '../shared/models/checkIn.model';
import { Guest } from '../shared/models/guest.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthDataStatic } from '../auth/auth-data.static';
import * as fromProperties from '../properties/store/properties.reducer';
import { take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Property } from '../shared/models/property.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  newCheckinForm: FormGroup;
  guestInputs = [];

  constructor(public propertiesService: PropertiesService,
              private db: FirestoreService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromProperties.State>) { }

  ngOnInit() {

    this.guestInputs = ['fullName', 'phone', 'email', 'adultCount', 'childCount'];

    this.newCheckinForm = new FormGroup({
      propertySelect: new FormControl(),
      fullName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      adultCount: new FormControl(),
      childCount: new FormControl(),
      checkin: new FormControl(),
      checkout: new FormControl(),
      expensesPaid: new FormControl(),
      notes: new FormControl(),
    });

    this.propertiesService.myPropertiesUpdate.pipe(take(1)).subscribe((properties: Property[]) => {
      if (properties.length === 1) {
        this.newCheckinForm.controls['propertySelect'].setValue(properties[0].idProperty, {onlySelf: true});
      }
    });

    this.route.params
    .subscribe(
      (params: Params) => {
        if (params.id !== undefined) {
          this.newCheckinForm.controls['propertySelect'].setValue(params.id, {onlySelf: true});
        }
      });
  }

  onSubmit() {
    this.store.select(fromProperties.getSelectedCheckin).pipe(take(1)).subscribe(idSelectedCheckin => {
      const idCheckin = (idSelectedCheckin === null) ? '0' : idSelectedCheckin;
      const pfValues = this.newCheckinForm.value;
      const checkinDate = new Date(pfValues.checkin);
      checkinDate.setHours(environment.defaultCheckinTime);
      const checkoutDate = new Date(pfValues.checkout);
      checkoutDate.setHours(environment.defaultCheckoutTime);

      const checkIn = new CheckIn(
        idCheckin,
        AuthDataStatic.authData.email,
        pfValues.propertySelect,
        new Guest(
          pfValues.fullName,
          pfValues.phone,
          pfValues.email,
          pfValues.adultCount,
          pfValues.childCount),
          checkinDate.toUTCString(),
          checkoutDate.toUTCString(),
          pfValues.expensesPaid,
          pfValues.notes
        );
      this.db.addNewCheckin(checkIn);
      // this.router.navigate(['properties/' + pfValues.propertySelect]);
      this.router.navigate(['properties']);
    });
  }
}
