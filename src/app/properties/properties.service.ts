import { Subscription, ReplaySubject, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { FirestoreService } from '../shared/firestore.service';
import { Host } from '../shared/models/host.model';
import { Property } from '../shared/models/property.model';
import { AuthDataStatic } from '../auth/auth-data.static';
import { DataMock } from '../shared/dataMock';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromProperties from './store/properties.reducer';
import * as PropertiesActions from './store/properties.actions';
import { CheckIn } from '../shared/models/checkIn.model';
import { take, map, find, mergeMap, flatMap } from 'rxjs/operators';
import { CheckInFull } from '../shared/models/checkinFull.model';

@Injectable()
export class PropertiesService implements OnDestroy {
  private _host: Host;
  private _hosts: Host[];
  private _myProperties: Property[];
  private _allProperties: Property[];
  private _myCheckins: CheckInFull[];
  private _allCheckins: CheckInFull[];

  selectedProperty: Property;
  private hostSub: Subscription;
  private hostsSub: Subscription;
  private myPropertiesSub: Subscription;
  private allPropertiesSub: Subscription;
  private myCheckinsSub: Subscription;
  private allCheckinsSub: Subscription;
  hostUpdate = new ReplaySubject<Host>(1);
  hostsUpdate = new ReplaySubject<Host[]>(1);
  myPropertiesUpdate = new ReplaySubject<Property[]>(1);
  allPropertiesUpdate = new ReplaySubject<Property[]>(1);
  myCheckinsUpdate = new ReplaySubject<CheckInFull[]>(1);
  allCheckinsUpdate = new ReplaySubject<CheckInFull[]>(1);

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

    // Subscribe to Hosts Response
    this.hostsSub = this.db.hostsUpdate.subscribe(hosts => {
      this._hosts = hosts;
      this.hostsUpdate.next(Object.create(this._hosts));
      console.log(this._hosts);
    });
    this.db.fetchHosts();

    // Subscribe to Properties Response
    this.allPropertiesSub = this.db.allPropertiesUpdate.subscribe(properties => {
      this._allProperties = properties;
      this.allPropertiesUpdate.next(Object.create(this._allProperties));

      // Subscribe to Checkins Response
      this.allCheckinsSub = this.db.allCheckinsUpdate.subscribe(checkins => this.fetchAndCreateCheckins(checkins, true)
        .then(() => { this.allCheckinsUpdate.next(Object.create(this._allCheckins)); }));
        this.db.fetchAllCheckins();

    });
    this.db.fetchAllProperties();



    // TODO: Al llegar la lista de todos los hosts, identificarme en lugar de hacer otro request y después pedir las propeidades.
    // Subscribe to Host Response
    this.hostSub = this.db.hostUpdate.subscribe(res => {
      this._host = res;
      this.hostUpdate.next(Object.create(this._host));
      this.db.fetchMyProperties(this._host);
      this.db.fetchCheckinByHost(this._host);
      // console.log(this.host);
    });

    // Subscribe to Properties Response
    this.myPropertiesSub = this.db.myPropertiesUpdate.subscribe(res => {
      this._myProperties = res;
      this.myPropertiesUpdate.next(Object.create(this._myProperties));
      // this.store.dispatch(new PropertiesActions.SetPropertiesList(this._properties));
      // this.store.select(fromProperties.getPropertiesList).subscribe( r => {console.log('rrrr'); console.log(r); });
      // console.log (this._properties);
    });

    // Subscribe to Checkins Response
    this.myCheckinsSub = this.db.myCheckinsUpdate.subscribe(checkins => this.fetchAndCreateCheckins(checkins, false)
    .then(() => { this.myCheckinsUpdate.next(Object.create(this._myCheckins)); }));
  }

  async fetchAndCreateCheckins(checkins: CheckIn[], all: boolean) {
      // console.log('this!!');
      // console.log(this);
      // this._checkins = res;
      if (all) {
        this._allCheckins = [];
      } else {
        this._myCheckins = [];
      }
      for (let i = 0; i < checkins.length; i++) {
      // checkins.forEach(checkin => {
        const checkinFull = new CheckInFull(checkins[i].idCheckin, checkins[i].idHost, checkins[i].idProperty, checkins[i].guest,
                                  checkins[i].checkingDateTime, checkins[i].checkoutDateTime, checkins[i].expensesPaid, checkins[i].notes);

        if (all) {
          this._allCheckins.push(checkinFull);
        } else {
          this._myCheckins.push(checkinFull);
        }
        // this.getHostByID(checkin.idHost).then((host: Host) => {checkinFull.host = host; console.log('AAAAA'); console.log(host); });
        // this.getPropertyByID(checkin.idProperty).then((property: Property) => checkinFull.property = property);
        const host = await this.getHostByID(checkins[i].idHost);
        const property = await this.getPropertyByID(checkins[i].idProperty);
        checkinFull.host = host;
        checkinFull.property = property;
      }
      // this.myCheckinsUpdate.next(Object.create(this._checkins));
      // console.log(res);

  }

  private fetchHostAndProperties() {
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  public getPropertyByID(idProperty: string): Promise<Property> {
    // console.log('b' + idProperty);
    return new Promise(resolve => {
      this.allPropertiesUpdate.pipe(take(1)
      , flatMap((properties: Property[]) => properties)
      , find(prop => {
        // console.log(prop.idProperty + ' ' + idProperty);
        return prop.idProperty === idProperty;
      })
      , map(prod1 => resolve (prod1))
      ).toPromise();
    });
  }

  public getCheckinByID(idCheckin: string): Promise<CheckIn> {
    return new Promise(resolve => {
      this.allCheckinsUpdate.pipe(take(1)
      , flatMap((checkins: CheckIn[]) => checkins)
      , find((checkin: CheckIn) => checkin.idCheckin === idCheckin)
      , map(checkin => resolve(checkin))
      ).toPromise();
    });
    // return this._checkins.find((checkin: CheckIn) => checkin.idCheckin === idCheckin);
  }

  public getHostByID(idHost: string): Promise<Host> {
    return new Promise(resolve => {
      this.hostsUpdate.pipe(take(1)
      , flatMap((hosts: Host[]) => {
        // console.log (hosts);
        return (hosts); })
      , find((host: Host) => {
        // console.log(host.idHost + ' - ' + idHost);
        return (host.idHost === idHost);
      })
      , map(host => {
        // console.log(host);
        resolve(host);
      })
      ).toPromise();
    });
  }

  public getHostProperties(idHost: string): Promise<Property[]> {
    return new Promise(resolve => {
      this.allPropertiesUpdate.pipe(take(1)
      , map((properties: Property[]) => {
        // console.log(properties);
        const retProps: Property[] = [];
        for (let i = 0; i < properties.length; i++) {
          if (properties[i].idHost === idHost) {
            retProps.push(properties[i]);
          }
        }
        resolve(retProps);
      })).toPromise();
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
      this._myProperties = [];
      this._myCheckins = [];
      this.hostUpdate.next(this._host);
      this.myPropertiesUpdate.next(this._myProperties);
      this.myCheckinsUpdate.next(this._myCheckins);
    }
  }

  ngOnDestroy() {
    if (this.myPropertiesSub) { this.myPropertiesSub.unsubscribe(); }
    if (this.hostSub) { this.hostSub.unsubscribe(); }
    if (this.myCheckinsSub) { this.myCheckinsSub.unsubscribe(); }
  }

}
