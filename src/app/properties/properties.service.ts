import { Subscription, Subject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { FirestoreService } from '../shared/firestore.service';
import { Host } from '../shared/models/host.model';
import { Property } from '../shared/models/property.model';
import { AuthDataStatic } from '../auth/auth-data.static';
import { DataMock } from '../shared/dataMock';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromProperties from './store/properties.reducer';

@Injectable()
export class PropertiesService implements OnDestroy {
  private _host: Host;
  get host() { return ((this._host) ? Object.create(this._host) : null); }
  private _properties: Property[];
  get properties() { return ((this._properties)  ? Object.create(this._properties) : null); }
  selectedProperty: Property;
  private propertiesSub: Subscription;
  private hostSub: Subscription;
  private checkinSub: Subscription;
  propertiesUpdate = new Subject<Property[]>();
  hostUpdate = new Subject<Host>();

  constructor(private store: Store<fromRoot.State>,
              private db: FirestoreService) {}

  public initPropertiesListener() {
    // Subscribe to AuthChange
    // this.authChangeSub = this.authService.authChange.subscribe(logedIn => {
    this.store.select(fromRoot.getIsAuth).subscribe(logedIn => {
      // console.log('Auth Change Subscriber ' + logedIn);
      // console.log(AuthDataStatic.authData);
      if (logedIn ) {
        this.fetchHostAndProperties();
      } else {
        this._host = null;
        this._properties = null;
      }
    });

    // Subscribe to Host Response
    this.hostSub = this.db.hostUpdate.subscribe(res => {
      this._host = res;
      // this._host.idHost = AuthDataStatic.authData.email;
      this.hostUpdate.next(Object.create(this._host));
      this.db.fetchMyProperties(this._host);
      // console.log(this.host);
    });

    // Subscribe to Properties Response
    this.propertiesSub = this.db.propertiesUpdate.subscribe(res => {
       this._properties = res;
      this.db.fetchCheckIn(res);
       this.propertiesUpdate.next(Object.create(this._properties));
      // console.log (this.properties);
    });
/*
    this.checkinSub = this.db.checkinsUpdate.subscribe(res => {
      this._properties = res;
      this.propertiesUpdate.next(Object.create(this._properties));
    });
*/
  }

  private fetchHostAndProperties() {
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  public getPropertyByID(idProperty: string): Property {
    // console.log(this._properties);
    return this._properties.find(asd => {
      // console.log(asd.idProperty + ' - ' + idProperty);
      return asd.idProperty === idProperty;
    });
  }

  public getCondos() {
    this.db.fetchCondos();
  }

  public addMyProperty(property: Property) {
    this.db.addMyProperty(property);
  }

  public addMyMockProperty() {
    this.db.addMyProperty(DataMock.generateProperty(this._host));
  }

  public updateProperty(property: Property) {
    this.db.updateProperty(property);
  }

  public updatePropertyValue(idProperty: string, key: string, newValue: string) {
    this.db.updatePropertyValue(idProperty, key, newValue);
  }

  public removeMyProperty(idProperty: string) {
    this.db.removeMyProperty(idProperty);
  }

  ngOnDestroy() {
    if (this.propertiesSub) { this.propertiesSub.unsubscribe(); }
    if (this.hostSub) { this.hostSub.unsubscribe(); }
  }

}
