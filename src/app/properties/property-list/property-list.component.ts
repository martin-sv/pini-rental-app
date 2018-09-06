import { Component, OnInit, Host, OnDestroy } from '@angular/core';
import { Property } from '../../shared/models/property.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromProperties from '../store/properties.reducer';
// import * as fromRoot from '../app.reducer';
import * as PROPERTIES from '../store/properties.actions';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  host: Host;
  properties: Property[];
  private hostUpdateSub: Subscription;
  private propertiesUpdateSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertiesService: PropertiesService,
              private store: Store<fromProperties.State>) {
  }

  ngOnInit() {
    // Initial Setup + Listeners
    this.host = this.propertiesService.host;
    this.properties = this.propertiesService.properties;
    this.hostUpdateSub = this.propertiesService.hostUpdate.subscribe(host => {
      this.host = host;
    });
    this.propertiesUpdateSub = this.propertiesService.propertiesUpdate.subscribe (properties => {
      this.properties = properties;
    });
    this.store.dispatch(new PROPERTIES.UnSelectProperty());
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onAddPropertyClick() {
    // console.log(this.host);
    this.router.navigate(['./addproperty'], {relativeTo: this.route});
  }

  onAddMockPropertyClick() {
    this.propertiesService.addMyMockProperty();
  }

  onAddGuestClick() {
    this.router.navigate(['/checkin']);
  }

  onPropertyClick(idProperty: string) {
    // console.log('idProperty: ' + id);
    this.store.dispatch(new PROPERTIES.SelectProperty(idProperty));
    this.router.navigate(['./', idProperty], {relativeTo: this.route});
  }

  onPropertyCardClick(idProperty: string) {
    this.propertiesService.removeMyProperty(idProperty);
  }

  ngOnDestroy() {
    if (this.hostUpdateSub) { this.hostUpdateSub.unsubscribe(); }
    if (this.propertiesUpdateSub) { this.propertiesUpdateSub.unsubscribe(); }
  }
}
