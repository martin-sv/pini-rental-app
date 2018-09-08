import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { FormGroup } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { Condo } from '../../shared/models/condo.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  idProperty = '';
  // focus: boolean[];
  inputs = [];
  propertyForm: FormGroup;
  condosList: Condo[];
  private checkinsUpdateSub: Subscription;

  displayedColumns: string[] = ['idHost', 'propertyName', 'guestName', 'checkinDate', 'checkoutDate', 'expensesPaid', 'edit'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              public propertiesService: PropertiesService,
              private dataService: DataService) { }

  ngOnInit() {
    this.condosList = this.dataService.condosList;

    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(params);
          this.propertiesService.getPropertyByID(params.id).then(res => {
            // console.log(params.id);
            this.idProperty = res.idProperty;
            // console.log('Property Details Component: idProperty: ' + this.idProperty);
          });
        }
      );

     this.checkinsUpdateSub = this.propertiesService.checkinsUpdate.subscribe(data => {
        const a = data;
        a.forEach(dat => {
          this.propertiesService.getPropertyByID(dat.idProperty).then(res => {
            dat['propertyName'] = res.name;
          });
        });
        this.dataSource.data = a;
      });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    /*
    this.propertyForm = new FormGroup({
      name: new FormControl(this.property.name),
      address: new FormControl(this.property.address)
    });

    this.focus = [];
    this.focus['name'] = false;
    this.focus['address'] = false;

    const v1 = {name: 'name', value: this.property.name};
    const v2 = {name: 'address', value: this.property.address};
    this.inputs.push(v1);
    this.inputs.push(v2);
    */

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCheckin(checkIn) {
    console.log(checkIn);
  }
  /*
  onFieldFocusIn(event) {
    this.focus[event.target.name] = true;
    // console.log(event.target.name);
    // console.log(this.propertyForm);
  }
  onFieldFocusOut(event) {
    // console.log(event);
    // console.log('onFieldFocusOut');
    this.focus[event.target.name] = false;
    this.propertiesService.updatePropertyValue(this.idProperty, event.target.name, event.target.value);
  }

  onFieldPressEnter(event) {
    event.target.blur();
  }
  */
  ngOnDestroy() {
    if (this.checkinsUpdateSub) { this.checkinsUpdateSub.unsubscribe(); }
  }

}
