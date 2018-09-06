import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PropertiesService } from '../properties/properties.service';
import { FirestoreService } from '../shared/firestore.service';
import { CheckIn } from '../shared/models/checkIn.model';
import { Guest } from '../shared/models/guest.model';
import { Router } from '@angular/router';

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
              private router: Router) { }

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


  }

  onSubmit() {
    const pfValues = this.newCheckinForm.value;
    const checkIn = new CheckIn(
      pfValues.propertySelect,
      new Guest(
        pfValues.fullName,
        pfValues.phone,
        pfValues.email,
        pfValues.adultCount,
        pfValues.childCount),
        new Date(pfValues.checkin),
        new Date(pfValues.checkout),
        pfValues.expensesPaid,
        pfValues.notes
      );
    this.db.addNewCheckin(checkIn);
    this.router.navigate(['properties/' + pfValues.propertySelect]);
  }
}
