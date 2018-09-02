import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Condo } from '../../shared/models/condo.model';
import { DataService } from '../../shared/data.service';
import { PropertiesService } from '../../properties/properties.service';
import { Property } from '../../shared/models/property.model';
import { DataMock } from '../../shared/dataMock';
import { PeopleAddress } from '../../shared/models/peopleAddress.model';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
              private dataService: DataService,
              private propertiesService: PropertiesService) { }

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
    const propertyFormValues = this.newPropertyForm.value;
    const apartment = (propertyFormValues.condoHouseSelect === 0) ? propertyFormValues.apartmentCondo : propertyFormValues.apartmentHouse;
    let condo: Condo;
    if (propertyFormValues.condoHouseSelect === 0) {
      condo = this.dataService.condosList.find(c => c.idCondo === propertyFormValues.condoSelect);
    }
    const property = new Property(
      '0',
      this.propertiesService.host,
      propertyFormValues.name,
      DataMock.getPropertyImage(),
      propertyFormValues.condoHouseSelect,
      150,
      new PeopleAddress(
        propertyFormValues.street,
        apartment,
        propertyFormValues.city,
        propertyFormValues.state,
        propertyFormValues.country,
        propertyFormValues.zip),
      condo);
      // console.log(property);
    this.propertiesService.addMyProperty(property);
    this.router.navigate(['/properties']);
  }
}
