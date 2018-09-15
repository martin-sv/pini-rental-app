import { Component, OnInit, Host, OnDestroy } from '@angular/core';
import { Property } from '../../shared/models/property.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromProperties from '../store/properties.reducer';
import * as PROPERTIES from '../store/properties.actions';
import { CheckIn } from '../../shared/models/checkIn.model';
import { Guest } from '../../shared/models/guest.model';
import { environment } from '../../../environments/environment';
import { CheckinsService } from '../../checkin/checkins.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  checkins: CheckIn[];
  production = environment.production;
  hasProperties: boolean;
  private hostUpdateSub: Subscription;
  private myPropertiesUpdateSub: Subscription;
  private checkinsUpdateSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public propertiesService: PropertiesService,
              private checkinsService: CheckinsService,
              public store: Store<fromProperties.State>) {}

  ngOnInit() {
    // Initial Listeners
    this.myPropertiesUpdateSub = this.propertiesService.myPropertiesUpdate.subscribe(properties => {
      this.hasProperties = (properties.length > 0) ? true : false;
    });

    this.checkinsUpdateSub = this.propertiesService.checkinsUpdate.subscribe(checkins => {
        this.checkins = checkins;
    });
    this.store.dispatch(new PROPERTIES.UnSelectProperty());
  }

  available(idProperty: string) {
    return this.checkinsService.available(idProperty);
  }

  currentGuest(idProperty: string) {
    return (this.checkinsService.currentGuest(idProperty) as Guest);
  }

  nextCheckin(idProperty: string) {
    return (this.checkinsService.nextCheckin(idProperty) as CheckIn).checkingDateTime;
  }

  nextCheckout(idProperty: string) {
    return (this.checkinsService.nextCheckout(idProperty) as CheckIn).checkoutDateTime;
  }

  lastCheckin(idProperty: string) {
    return (this.checkinsService.lastCheckin(idProperty) as CheckIn).checkingDateTime;
  }

  lastCheckout(idProperty: string) {
    return (this.checkinsService.lastCheckout(idProperty) as CheckIn).checkoutDateTime;
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
    if (this.myPropertiesUpdateSub) { this.myPropertiesUpdateSub.unsubscribe(); }
    if (this.checkinsUpdateSub) { this.checkinsUpdateSub.unsubscribe(); }
  }
}
