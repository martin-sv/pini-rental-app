import { AngularFirestore } from 'angularfire2/firestore';
import { Host } from './models/host.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from './models/property.model';
import { PropertyClassEnum } from './models/propertyClassEnum';
import { AuthDataStatic } from '../auth/auth-data.static';
import { Condo } from './models/condo.model';
import { Address } from './models/address.model';
import { CheckIn } from './models/checkIn.model';

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

  public fetchHost(emailHost: string) {
    if (this.verbose) { console.log('Firebase: fetchHost: ' + emailHost); }
    this.firebaseSubs.push(this.db.doc<Host>('hosts/' + emailHost)
      .valueChanges()
      .subscribe(result => {
        // The properties are then fetched elsewhere. Since they don't come with the doc as they are a collection of the Host.
        const host = new Host(emailHost, result.firstName, result.lastName, result.phone, result.email, result.homeAddress);
        this.hostUpdate.next(Object.create(host));
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      })
    );
  }

  // TODO: Ver que hacer con el tema host
  public fetchMyProperties(host: Host) {
    if (this.verbose) { console.log('Firebase: fetchMyProperties: '); console.log(host); }
    this.firebaseSubs.push(this.db
      .collection('hosts/' + AuthDataStatic.authData.email + '/properties')
      .snapshotChanges()
      .pipe(map(docArray => {
        // console.log(docArray);
        return docArray.map(doc => {
          return new Property(
            doc.payload.doc.id,
            host,
            doc.payload.doc.data()['name'],
            doc.payload.doc.data()['cover'],
            PropertyClassEnum.appartment, // TODO: Traer info de Firebase
            doc.payload.doc.data()['serviceFee'],
            doc.payload.doc.data()['address'],
            doc.payload.doc.data()['condo'],
            doc.payload.doc.data()['checkInOutHistory'],
            doc.payload.doc.data()['cleaningHistory']);
        });
      }))
      .subscribe((props: Property[]) => {
        // console.log(props);
        this.propertiesUpdate.next(Object.create(props));
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      })
    );
  }

  public fetchCheckInByHost(host: Host) {
    if (this.verbose) { console.log('Firebase: fetchCheckInByHost: '); console.log(host); }
    this.firebaseSubs.push(this.db
      .collection('checkin', ref => ref.where('idHost', '==', host.idHost)).valueChanges().subscribe(checkinsRaw => {
        const checkins: CheckIn[] = [];
        checkinsRaw.forEach(checkin => {
          checkins.push(checkin as CheckIn);
        });
        this.checkinsUpdate.next(Object.create(checkins));
    }));
  }

  public fetchCheckInByProperty(property: Property) {
    if (this.verbose) { console.log('Firebase: fetchCheckInByProperty: '); console.log(property); }
    this.firebaseSubs.push(this.db
      .collection('checkin', ref => ref.where('idProperty', '==', property.idProperty)).valueChanges().subscribe(checkinsRaw => {
        const checkins: CheckIn[] = [];
        checkinsRaw.forEach((checkin: CheckIn) => {
          checkins.push(checkin);
        });
        this.checkinsUpdate.next(Object.create(checkins));
    }));
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

  fetchCondos() {
    if (this.verbose) { console.log('Firebase: fetchCondos'); }
    this.firebaseSubs.push(this.db.collection<Condo>('condos')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return new Condo(
            doc.payload.doc.id,
            doc.payload.doc.data()['name'],
            new Address(
              doc.payload.doc.data()['street'],
              doc.payload.doc.data()['city'],
              doc.payload.doc.data()['state'],
              doc.payload.doc.data()['country'],
              doc.payload.doc.data()['zip']
            ),
            doc.payload.doc.data()['phone'],
            doc.payload.doc.data()['condoNotes']
          );
        });
      }))
      .subscribe((condos: Condo[]) => {
        // console.log(condos);
        this.condosUpdate.next(condos);
        // this.store.dispatch(new data.SetCondosList(condos));
      })
    );
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

  addNewHost(host: Host) {
    if (this.verbose) { console.log('Firebase: addNewHost: ' + host); }
    const propertyJSON = JSON.parse(JSON.stringify(host));
    delete propertyJSON.propertyList;
    this.db.doc('hosts/' + host.email).set(propertyJSON);
  }

  addMyProperty(property: Property) {
    if (this.verbose) { console.log('Firebase: addMyProperty: ' + property); }
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    // console.log(property);
    // console.log(propertyJSON);
    this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties').add(propertyJSON)
      .then(f => {
        propertyJSON.idHost = property.host.idHost;
        this.db.doc('properties/' + f.id).set(propertyJSON);
      });
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
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).delete();
    this.db.doc('properties/' + idProperty).delete();
  }

  addNewCheckin(checkIn: CheckIn) {
    if (this.verbose) { console.log('Firebase: addNewCheckin: '); console.log(checkIn); }
    const checkInJSON = JSON.parse(JSON.stringify(checkIn));
    // this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties/' + checkIn.idProperty + '/checkin').add(checkInJSON);
    this.db.collection('checkin').add(checkInJSON);
  }

  addNewErrorMessageDiscovered(code: string, message: string) {
    if (this.verbose) { console.log('Firebase: addNewErrorMessageDiscovered: ' + code + ' ' + message); }
    this.db.collection('error-messages-discovered').add({code: code, message: message});
  }

  cancelSubscriptions() {
    if (this.firebaseSubs) { this.firebaseSubs.forEach(sub => sub.unsubscribe()); }
  }
}
