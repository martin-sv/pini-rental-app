import { Component, OnInit, Host, OnDestroy } from '@angular/core';
import { Property } from '../../shared/models/property.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromProperties from '../store/properties.reducer';
import * as PROPERTIES from '../store/properties.actions';
import { CheckIn } from '../../shared/models/checkIn.model';
import { CheckinsHelper } from '../../checkin/checkinsHelper';
import { Guest } from '../../shared/models/guest.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  host: Host;
  properties: Property[];
  checkins: CheckIn[];
  private hostUpdateSub: Subscription;
  private propertiesUpdateSub: Subscription;
  private checkinsUpdateSub: Subscription;
  production = environment.production;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertiesService: PropertiesService,
              private store: Store<fromProperties.State>) {

    this.checkins = propertiesService.checkins;
  }

  ngOnInit() {
    // Initial Setup + Listeners
    this.host = this.propertiesService.host;
    this.properties = this.propertiesService.properties;
    this.checkins = this.propertiesService.checkins;
    this.hostUpdateSub = this.propertiesService.hostUpdate.subscribe(host => {
      this.host = host;
    });
    this.propertiesUpdateSub = this.propertiesService.propertiesUpdate.subscribe(properties => {
      this.properties = properties;
    });
    this.checkinsUpdateSub = this.propertiesService.checkinsUpdate.subscribe(checkins => {
        this.checkins = checkins;
    });
    this.store.dispatch(new PROPERTIES.UnSelectProperty());
  }

  available(idProperty: string) {
    return CheckinsHelper.available(this.checkins, idProperty);
  }

  currentGuest(idProperty: string) {
    return (CheckinsHelper.currentGuest(this.checkins, idProperty) as Guest);
  }

  nextCheckin(idProperty: string) {
    if (this.checkins !== null) {
      return (CheckinsHelper.nextCheckin(this.checkins, idProperty) as CheckIn).checkingDateTime;
    }
  }

  nextCheckout(idProperty: string) {
    if (this.checkins !== null) {
      return (CheckinsHelper.nextCheckout(this.checkins, idProperty) as CheckIn).checkoutDateTime;
    }
  }

  lastCheckin(idProperty: string) {
    if (this.checkins !== null) {
      return (CheckinsHelper.lastCheckin(this.checkins, idProperty) as CheckIn).checkingDateTime;
    }
  }

  lastCheckout(idProperty: string) {
    if (this.checkins !== null) {
      return (CheckinsHelper.lastCheckout(this.checkins, idProperty) as CheckIn).checkoutDateTime;
    }
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

  onFlushPropertiesClick() {
    this.propertiesService.onFlushProperties();
  }

  onAddGuestClick(idProperty = '') {
    this.router.navigate(['/checkin/' + idProperty]);
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
    if (this.checkinsUpdateSub) { this.checkinsUpdateSub.unsubscribe(); }
  }
}
