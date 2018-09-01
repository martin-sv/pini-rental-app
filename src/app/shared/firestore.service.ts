import { AngularFirestore } from 'angularfire2/firestore';
import { Host } from './host.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from './property.model';
import { PropertyClassEnum } from './propertyClassEnum';
import { AuthService } from '../auth/auth.service';
import { AuthDataStatic } from '../auth/auth-data.static';

@Injectable()
export class FirestoreService {
  private host: Host;
  private properties: Property[];
  propertiesUpdate = new Subject<Property[]>();
  hostUpdate = new Subject<Host>();
  private firebaseSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public fetchHost(idHost: string) {
    this.firebaseSubs.push(this.db.doc<Host>('hosts/' + idHost)
      .valueChanges()
      .subscribe(result => {
        // console.log(result);
        this.host = new Host(result.idHost, result.firstName, result.lastName);
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
          return new Property(doc.payload.doc.id,
            host,
            doc.payload.doc.data()['name'],
            PropertyClassEnum.appartment, // TODO: Traer info de Firebase
            doc.payload.doc.data()['address'],
            doc.payload.doc.data()['serviceFee'],
            doc.payload.doc.data()['cover']);
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
    console.log('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty);
    this.firebaseSubs.push(this.db.doc<Property>('hosts/' + AuthDataStatic.authData.email + '/properties/' + idProperty)
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      })
    );
  }

  addMyProperty(property: Property) {
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    // console.log(propertyJSON);
    this.db.collection('hosts/' + AuthDataStatic.authData.email + '/properties').add(propertyJSON);
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
