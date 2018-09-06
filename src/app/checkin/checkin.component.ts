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

  constructor(public propertiesService: PropertiesService) { }

  ngOnInit() {

    this.newCheckinForm = new FormGroup({
      propertySelect: new FormControl()
    });
  }

}
