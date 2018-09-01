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

@Injectable()
export class FirestoreService {
  private host: Host;
  private properties: Property[];
  propertiesUpdate = new Subject<Property[]>();
  hostUpdate = new Subject<Host>();
  condosUpdate = new Subject<Condo[]>();
  private firebaseSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public fetchHost(emailHost: string) {
    // console.log('fetchHost: ' + emailHost);
    this.firebaseSubs.push(this.db.doc<Host>('hosts/' + emailHost)
      .valueChanges()
      .subscribe(result => {
        // The properties are then fetched elsewhere. Since they don't come with the doc as they are a collection of the Host.
        this.host = new Host(result.firstName, result.lastName, result.phone, result.email, result.homeAddress);
        this.hostUpdate.next(Object.create(this.host));
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      })
    );
  }

  // TODO: Ver que hacer con el tema host
  public fetchMyProperties(host: Host) {
    this.firebaseSubs.push(this.db
      .collection('hosts/' + AuthDataStatic.authData.email + '/properties')
      .snapshotChanges()
      .pipe(map(docArray => {
        // console.log(docArray);
        return docArray.map(doc => {
          // console.log(doc.payload.doc.data()['name']);
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
        this.properties = props;
        this.propertiesUpdate.next(Object.create(this.properties));
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      })
    );
  }

  public fetchProperty(idProperty: string) {
    // console.log('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty);
    this.firebaseSubs.push(this.db.doc<Property>('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty)
      .valueChanges()
      .subscribe(result => {
        // console.log(result);
      })
    );
  }

  fetchCondos() {
    this.firebaseSubs.push(this.db.collection<Condo >('condos')
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
      })
    );
  }

  addNewHost(host: Host) {
    const propertyJSON = JSON.parse(JSON.stringify(host));
    delete propertyJSON.propertyList;
    this.db.doc('hosts/' + host.email).set(propertyJSON);
  }

  addMyProperty(property: Property) {
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    // console.log(propertyJSON);
    this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties').add(propertyJSON);
  }

  public updatePropertyValue(idProperty: string, key: string, newValue: string) {
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).update({
      [key]: newValue
    });

  }

  removeMyProperty(idProperty: string) {
    this.db.doc('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty).delete();
  }

  addNewErrorMessageDiscovered(code: string, message: string) {
    this.db.collection('error-messages-discovered').add({code: code, message: message});
  }

  cancelSubscriptions() {
    if (this.firebaseSubs) { this.firebaseSubs.forEach(sub => sub.unsubscribe()); }
  }
}
