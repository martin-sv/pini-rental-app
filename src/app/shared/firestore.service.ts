import { AngularFirestore } from 'angularfire2/firestore';
import { Host } from './models/host.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Property } from './models/property.model';
import { PropertyClassEnum } from './models/propertyClassEnum';
import { AuthDataStatic } from '../auth/auth-data.static';
import { Condo } from './models/condo.model';
import { Address } from './models/address.model';
import { CheckIn } from './models/checkIn.model';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class FirestoreService {
  /*
  private host: Host;
  private properties: Property[];
  private checkins: CheckIn[];
  */
  propertiesUpdate = new Subject<Property[]>();
  hostUpdate = new Subject<Host>();
  condosUpdate = new Subject<Condo[]>();
  propertyTypesUpdate = new Subject<any>();
  checkinsUpdate = new Subject<CheckIn[]>();
  private firebaseSubs: Subscription[] = [];
  private verbose = true;

  constructor(private db: AngularFirestore) {}

  // *** HOSTS *** //

  public fetchHost(emailHost: string) {
    if (this.verbose) { console.log('Firebase: fetchHost: ' + emailHost); }
    this.firebaseSubs.push(this.db.doc<Host>('hosts/' + emailHost)
      .valueChanges()
      .subscribe(result => {
        // The properties are then fetched elsewhere. Since they don't come with the doc as they are a collection of the Host.
        const host = new Host(emailHost, result.firstName, result.lastName, result.phone, result.email, result.homeAddress);
        this.hostUpdate.next(Object.create(host));
      }, error => {
        console.log(error);
      })
    );
  }


  addNewHost(host: Host) {
    if (this.verbose) { console.log('Firebase: addNewHost: ' + host); }
    const propertyJSON = JSON.parse(JSON.stringify(host));
    delete propertyJSON.propertyList;
    this.db.doc('hosts/' + host.email).set(propertyJSON);
  }

  // *** PROPERTIES *** //

  // TODO: Ver que hacer con el tema host
  public fetchMyProperties(host: Host) {
    if (this.verbose) { console.log('Firebase: fetchMyProperties: '); console.log(host); }
    this.firebaseSubs.push(this.db
      .collection('hosts/' + AuthDataStatic.authData.email + '/properties')
      .valueChanges()
      .subscribe(propertiesRaw => {
        const properties: Property[] = [];
        propertiesRaw.forEach((property: Property) => {
          if (!property['inactive']) {
            properties.push(property);
          }
        });
        this.propertiesUpdate.next(Object.create(properties));
      }, error => {
        console.log(error);
      })
    );
  }

  addMyProperty(property: Property) {
    if (this.verbose) { console.log('Firebase: addMyProperty: ' + property); }
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    propertyJSON.idHost = property.host.idHost;
    // console.log(property);
    // console.log(propertyJSON);
    this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties').add(propertyJSON)
      .then(data => {
        // Add property ID
        propertyJSON.idProperty = data.id;
        // Copy the property in the properties root
        this.db.doc('properties/' + data.id).set(propertyJSON);
        // Update the property ID under the host's collection on properties
        this.db.doc(data.path).update({'idProperty': data.id });
      })
      .catch( error => console.log (error));
  }

  public updateProperty(property: Property) {
    if (this.verbose) { console.log('Firebase: updateProperty: '); console.log(property); }
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + property.idProperty).set(propertyJSON);
  }

  public updatePropertyValue(idProperty: string, key: string, newValue: string) {
    if (this.verbose) { console.log('Firebase: updatePropertyValue: ' + key + ' ' + newValue); }
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).update({
      [key]: newValue
    });
  }

  removeMyProperty(idProperty: string) {
    if (this.verbose) { console.log('Firebase: removeMyProperty: ' + idProperty); }
    // this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).delete();
    // this.db.doc('properties/' + idProperty).delete();
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).update({inactive: true});
    this.db.doc('properties/' + idProperty).update({inactive: true});
    this.db
      .collection('checkins', ref => ref.where('idProperty', '==', idProperty))
      .valueChanges()
      .subscribe(checkins => {
        checkins.forEach((checkin: CheckIn) => {
          this.removeCheckin(checkin.idCheckin);
        });
    });
  }

  flushMyProperties() {
    if (this.verbose) { console.log('Firebase: flushMyProperties'); }
    this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties')
      .valueChanges()
      .pipe(take(1))
      .subscribe((properties) => {
        properties.forEach((property: Property) => {
          console.log('Deleting Property:' + 'hosts/' + AuthDataStatic.authData.email + '/properties/' + property.idProperty);
          this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + property.idProperty).delete();
          this.db
          .collection('checkins', ref => ref.where('idProperty', '==', property.idProperty))
          .valueChanges()
          .subscribe(checkins => {
            checkins.forEach((checkin: CheckIn) => {
              this.db.doc('checkins/' + checkin.idCheckin).delete();
              console.log('Deleting Checkin:' + 'checkins/' + checkin.idCheckin);
            });
          });
      });
    });
  }

  public fetchProperty(idProperty: string) {
    if (this.verbose) { console.log('Firebase: fetchProperty: ' + idProperty); }
    // console.log('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty);
    this.firebaseSubs.push(this.db.doc<Property>('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty)
      .valueChanges()
      .subscribe(result => {
        // console.log(result);
      })
    );
  }


  // *** CHECKIN *** //

  public fetchCheckInByHost(host: Host) {
    if (this.verbose) { console.log('Firebase: fetchCheckInByHost: '); console.log(host); }

    this.firebaseSubs.push(this.db
      .collection('checkins', ref => ref.where('idHost', '==', host.idHost))
      .valueChanges()
      .subscribe(checkinsRaw => {
        const checkins: CheckIn[] = [];
        checkinsRaw.forEach(checkin => {
          if (!checkin['inactive']) {
            checkins.push(checkin as CheckIn);
          }
        });
        this.checkinsUpdate.next(Object.create(checkins));
    }));
  }

  public fetchCheckInByProperty(property: Property) {
    if (this.verbose) { console.log('Firebase: fetchCheckInByProperty: '); console.log(property); }
    this.firebaseSubs.push(this.db
      .collection('checkins', ref => ref.where('idProperty', '==', property.idProperty))
      .valueChanges()
      .subscribe(checkinsRaw => {
        const checkins: CheckIn[] = [];
        checkinsRaw.forEach(checkin => {
          checkins.push(checkin as CheckIn);
        });
        this.checkinsUpdate.next(Object.create(checkins));
    }));
  }

  addNewCheckin(checkin: CheckIn) {
    if (this.verbose) { console.log('Firebase: addNewCheckin: '); console.log(checkin); }
    // checkIn.checkingDateTime = checkIn.checkingDateTime.toUTCString();
    // checkIn.checkoutDateTime = checkIn.checkingDateTime.toUTCString();
    const checkInJSON = JSON.parse(JSON.stringify(checkin));
    // this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties/' + checkIn.idProperty + '/checkin').add(checkInJSON);
    this.db.collection('checkins').add(checkInJSON)
    .then (data => {
      this.db.doc('checkins/' + data.id).update({'idCheckin': data.id });
    })
    .catch( error => console.log (error));
  }

  removeCheckin(idCheckin: string) {
    this.db.doc('checkins/' + idCheckin).update({inactive: true});
  }


  // *** OTHER *** //

  fetchCondos() {
    if (this.verbose) { console.log('Firebase: fetchCondos'); }
    this.firebaseSubs.push(this.db.collection<Condo>('condos')
      .valueChanges()
      .subscribe(condoRaw => {
        const condos: Condo[] = [];
        condoRaw.forEach((condo: Condo) => {
          condos.push(condo);
        });
        // console.log(condos);
        this.condosUpdate.next(condos);
        // this.store.dispatch(new data.SetCondosList(condos));
      }, error => console.log(error)));
  }

  fetchPropertyTypes() {
    if (this.verbose) { console.log('Firebase: fetchPropertyTypes'); }
    this.firebaseSubs.push(this.db.collection<any>('propertyTypes')
      .valueChanges()
      .subscribe(result => {
        const propertyTypes = (result[0].list);
        // console.log(propertyTypes);
        this.propertyTypesUpdate.next(propertyTypes);
        // this.store.dispatch(new data.SetPropertyTypes(propertyTypes));
      })
    );
  }

  addNewErrorMessageDiscovered(code: string, message: string) {
    if (this.verbose) { console.log('Firebase: addNewErrorMessageDiscovered: ' + code + ' ' + message); }
    this.db.collection('error-messages-discovered').add({code: code, message: message});
  }

  cancelSubscriptions() {
    if (this.firebaseSubs) { this.firebaseSubs.forEach(sub => sub.unsubscribe()); }
  }
}
