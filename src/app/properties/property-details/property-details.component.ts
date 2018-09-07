import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { Property } from '../../shared/models/property.model';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../../shared/data.service';
import { Condo } from '../../shared/models/condo.model';
import { CheckIn } from '../../shared/models/checkIn.model';
import { Subscription, Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  property: Property;
  focus: boolean[];
  inputs = [];
  propertyForm: FormGroup;
  condosList: Condo[];
  // checkins$: Observable<CheckIn[]>;
  private checkinsUpdateSub: Subscription;

  displayedColumns: string[] = ['idHost', 'propertyName', 'guestName', 'checkinDate', 'checkoutDate', 'expensesPaid', 'edit'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              public propertiesService: PropertiesService,
              private dataService: DataService) {

    // this.checkins = propertiesService.checkins;
    // this.dataSource = new MatTableDataSource(this.checkins$);
  }

  ngOnInit() {
    this.condosList = this.dataService.condosList;

    this.route.params
      .subscribe(
        (params: Params) => {
          // console.log(params);
          // this.db.fetchProperty(params.id);
          this.property = this.propertiesService.getPropertyByID(params.id);
        }
      );


      /*
      this.propertiesService.checkinsUpdate.pipe(map(data => {
        this.dataSource.data = data;
      }));
      */
     this.checkinsUpdateSub = this.propertiesService.checkinsUpdate.subscribe(data => {
        this.dataSource.data = data;
      });
      // Push the initial data
      this.propertiesService.checkinsUpdate.next(this.propertiesService.checkins);


    /*
    this.checkinsUpdateSub = this.propertiesService.checkinsUpdate.subscribe(checkins => {
      this.checkins = checkins;
      this.dataSource = new MatTableDataSource(this.checkins);
    });
    */
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

  onFieldFocusIn(event) {
    this.focus[event.target.name] = true;
    // console.log(event.target.name);
    // console.log(this.propertyForm);
  }
  onFieldFocusOut(event) {
    // console.log(event);
    // console.log('onFieldFocusOut');
    this.focus[event.target.name] = false;
    this.propertiesService.updatePropertyValue(this.property.idProperty, event.target.name, event.target.value);
  }

  onFieldPressEnter(event) {
    event.target.blur();
  }

  ngOnDestroy() {
    if (this.checkinsUpdateSub) { this.checkinsUpdateSub.unsubscribe(); }
  }

}
