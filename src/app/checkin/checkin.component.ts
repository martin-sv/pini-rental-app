import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PropertiesService } from '../properties/properties.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  newCheckinForm: FormGroup;
  guestInputs = [];

  constructor(public propertiesService: PropertiesService) { }

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


  onSubmint() {
    const propertyFormValues = this.newCheckinForm.value;
  }

}
