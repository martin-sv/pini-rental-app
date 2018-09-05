import { Component, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
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
export class PropertyCreateEditComponent implements OnInit, AfterViewChecked {
  newPropertyForm: FormGroup;
  inputs = [];
  // propertyTypeList$: Observable<string[]>;
  // condosList$: Observable<Condo[]>;
  // propertyTypeList: string[];
  // condosList: Condo[];

  constructor(private router: Router,
              private propertiesService: PropertiesService,
              public dataService: DataService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.propertyTypeList$ = this.store.select(fromRoot.getPropertyTypes);
    // this.condosList$ = this.store.select(fromRoot.getCondosList);

    // this.store.select(fromRoot.getPropertyTypes).pipe(take(1)).subscribe( r => this.propertyTypeList = r );
    // this.store.select(fromRoot.getCondosList).pipe(take(1)).subscribe( r => this.condosList = r );

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
      zip: new FormControl(),
      submit: new FormControl()
    });
    // this.inputs = ['name'];
  }

  ngAfterViewChecked() {
    // The reason for this check is to avoid having an ExpressionChangedAfterItHasBeenCheckedError
    // when the dropdown property type is used and the disabled property of the Submit button changes
    // Since disabled changes during the changeCheck, it throws the error. This extra checks prevents so.
    this.cd.detectChanges();
}

  async onSubmit() {
    const propertyFormValues = this.newPropertyForm.value;
    const apartment = (propertyFormValues.condoHouseSelect === 0) ? propertyFormValues.apartmentCondo : propertyFormValues.apartmentHouse;
    let condo;
    if (propertyFormValues.condoHouseSelect === 0) {
      condo = this.dataService.condosList.find(c => c.idCondo === propertyFormValues.condoSelect);
      // condo = this.condosList$.find(c => c.idCondo === propertyFormValues.condoSelect);
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
