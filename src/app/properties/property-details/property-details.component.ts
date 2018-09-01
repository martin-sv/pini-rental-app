import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';
import { PropertiesService } from '../properties.service';
import { Property } from '../../shared/property.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property;
  focus: boolean[];
  propertyForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private propertiesService: PropertiesService) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(params);
          // this.db.fetchProperty(params.id);
          this.property = this.propertiesService.getPropertyByID(params.id);
          this.showPropertyData();
        }
      );

    this.propertyForm = new FormGroup({
      tel: new FormControl(this.property.name),
      tel2: new FormControl(this.property.address)
    });
    this.focus = [];
    this.focus['tel'] = false;
    this.focus['tel2'] = false;
  }

  private showPropertyData() {

  }

  onFieldFocusIn(event) {
    this.focus[event.target.name] = true;
    // console.log(event.target.name);
    // console.log(this.propertyForm);
  }
  onFieldFocusOut(event) {
    this.focus[event.target.name] = false;
    console.log(event);
  }

}
