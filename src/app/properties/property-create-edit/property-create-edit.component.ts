import { Component, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Condo } from '../../shared/models/condo.model';
import { DataService } from '../../shared/data.service';
import { PropertiesService } from '../../properties/properties.service';
import { Property } from '../../shared/models/property.model';
import { DataMock } from '../../shared/dataMock';
import { PeopleAddress } from '../../shared/models/peopleAddress.model';
import { Router } from '@angular/router';
import * as fromProperties from '../store/properties.reducer';
import * as PROPERTIES from '../store/properties.actions';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-property-create-edit',
  templateUrl: './property-create-edit.component.html',
  styleUrls: ['./property-create-edit.component.css']
})
export class PropertyCreateEditComponent implements OnInit, AfterViewChecked {
  @Input() idProperty: '';
  newPropertyForm: FormGroup;
  inputs = [];
  property: Property;
  // propertyTypeList$: Observable<string[]>;
  // condosList$: Observable<Condo[]>;
  // propertyTypeList: string[];
  // condosList: Condo[];

  constructor(private router: Router,
              private propertiesService: PropertiesService,
              public dataService: DataService,
              private cd: ChangeDetectorRef,
              private store: Store<fromProperties.State>) { }

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
    this.property = this.propertiesService.getPropertyByID(this.idProperty);
    // console.log(this.property);

    if (this.property !== undefined) {
      this.newPropertyForm.get('name').setValue(this.property.name);
      if (this.property.condo !== undefined) {
        this.newPropertyForm.get('condoHouseSelect').setValue(0);
        this.newPropertyForm.get('apartmentCondo').setValue(this.property.address.appartment);
        // this.newPropertyForm.get('condoSelect').setValue(this.property.condo.idCondo);
        this.newPropertyForm.get('condoSelect').setValue('y8qU3839gLhdkztfXso0');
        // console.log(this.property.condo.idCondo);
      } else {
        this.newPropertyForm.get('condoHouseSelect').setValue(1);
        this.newPropertyForm.get('apartmentHouse').setValue(this.property.address.appartment);
        this.newPropertyForm.get('street').setValue(this.property.address.street);
        this.newPropertyForm.get('city').setValue(this.property.address.city);
        this.newPropertyForm.get('state').setValue(this.property.address.state);
        this.newPropertyForm.get('country').setValue(this.property.address.country);
        this.newPropertyForm.get('zip').setValue(this.property.address.zip);
      }
    }

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
    // console.log(property);
    this.store.select(fromProperties.getPropertySelected).pipe(take(1)).subscribe(idSelectedProperty => {
      const idProp = (idSelectedProperty === null) ? '0' : idSelectedProperty;
      const property = new Property(
        idProp,
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

      if (idSelectedProperty === null) {
        this.propertiesService.addMyProperty(property);
        // this.router.navigate(['/properties']);
      } else {
        this.propertiesService.updateProperty(property);
      }
      this.router.navigate(['/properties']);
    });
  }
}
