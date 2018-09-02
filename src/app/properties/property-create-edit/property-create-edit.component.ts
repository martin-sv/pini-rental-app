import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Condo } from '../../shared/models/condo.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-property-create-edit',
  templateUrl: './property-create-edit.component.html',
  styleUrls: ['./property-create-edit.component.css']
})
export class PropertyCreateEditComponent implements OnInit {
  newPropertyForm: FormGroup;
  inputs = [];
  condosList: Condo[];
  propertyTypeList: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.condosList = this.dataService.condosList;
    this.propertyTypeList = this.dataService.propertyTypeList;

    this.newPropertyForm = new FormGroup({
      name: new FormControl(),
      condoHouseSelect: new FormControl(),
      condoSelect: new FormControl(),
      apartmentCondo: new FormControl(),
      apartmentHouse: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      country: new FormControl(),
      zip: new FormControl()
    });
    this.inputs = ['name'];

  }

  onSubmit() {

  }
}
