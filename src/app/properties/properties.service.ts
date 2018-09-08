import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { FirestoreService } from '../shared/firestore.service';
import { Host } from '../shared/models/host.model';
import { Property } from '../shared/models/property.model';
import { AuthDataStatic } from '../auth/auth-data.static';
import { DataMock } from '../shared/dataMock';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { CheckIn } from '../shared/models/checkIn.model';
import { take, map, find, mergeMap, flatMap } from 'rxjs/operators';

@Injectable()
export class PropertiesService implements OnDestroy {
  private _host: Host;
  private _properties: Property[];
  private _checkins: CheckIn[];

  selectedProperty: Property;
  private propertiesSub: Subscription;
  private hostSub: Subscription;
  private checkinSub: Subscription;
  hostUpdate = new ReplaySubject<Host>(1);
  propertiesUpdate = new ReplaySubject<Property[]>(1);
  checkinsUpdate = new ReplaySubject<CheckIn[]>(1);

  constructor(private store: Store<fromRoot.State>,
              private db: FirestoreService) {}

  public initPropertiesListener() {
    // Subscribe to AuthChange
    // this.authChangeSub = this.authService.authChange.subscribe(logedIn => {
    this.store.select(fromRoot.getIsAuth).subscribe(logedIn => {
      // console.log('Auth Change Subscriber ' + logedIn);
      // console.log(AuthDataStatic.authData);
      if (logedIn) {
        this.fetchHostAndProperties();
      } else {
        this.clearPropertiesData();
      }
    });

    // Subscribe to Host Response
    this.hostSub = this.db.hostUpdate.subscribe(res => {
      this._host = res;
      this.hostUpdate.next(Object.create(this._host));
      this.db.fetchMyProperties(this._host);
      this.db.fetchCheckInByHost(this._host);
      // console.log(this.host);
    });

    // Subscribe to Properties Response
    this.propertiesSub = this.db.propertiesUpdate.subscribe(res => {
      this._properties = res;
      this.propertiesUpdate.next(Object.create(this._properties));
      console.log (this._properties);
    });

    // Subscribe to Checkins Response
    this.checkinSub = this.db.checkinsUpdate.subscribe(res => {
      this._checkins = res;
      this.checkinsUpdate.next(Object.create(this._checkins));
      // console.log(res);
    });
  }

  private fetchHostAndProperties() {
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  public getPropertyByID(idProperty: string): Promise<Property> {
    console.log('b' + idProperty);
    return new Promise(resolve => {
      this.propertiesUpdate.pipe(take(1)
      , flatMap((properties: Property[]) => properties)
      , find(prop => {
        console.log(prop.idProperty + ' ' + idProperty);
        return prop.idProperty === idProperty;
      })
      , map(prod1 => resolve (prod1))
      ).toPromise();
    });
  }

  public getCheckinByID(idCheckin: string): Promise<CheckIn> {
    return new Promise(resolve => {
      this.checkinsUpdate.pipe(take(1)
      , flatMap((checkins: CheckIn[]) => checkins)
      , find((checkin: CheckIn) => checkin.idCheckin === idCheckin)
      , map(checkin => resolve(checkin))
      ).toPromise();
    });
    // return this._checkins.find((checkin: CheckIn) => checkin.idCheckin === idCheckin);
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

  public onFlushProperties() {
    this.db.flushMyProperties();
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

  private clearPropertiesData() {
    if (this._host && this._host != null) {
      this._host = null;
      this._properties = [];
      this._checkins = [];
      this.hostUpdate.next(this._host);
      this.propertiesUpdate.next(this._properties);
      this.checkinsUpdate.next(this._checkins);
    }
  }

  ngOnDestroy() {
    if (this.propertiesSub) { this.propertiesSub.unsubscribe(); }
    if (this.hostSub) { this.hostSub.unsubscribe(); }
    if (this.checkinSub) { this.checkinSub.unsubscribe(); }
  }

}
