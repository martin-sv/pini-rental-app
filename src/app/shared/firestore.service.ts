import { AngularFirestore } from 'angularfire2/firestore';
import { Host } from './host.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from './property.model';
import { PropertyClassEnum } from './propertyClassEnum';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class FirestoreService {
  private properties: Array<Property>;
  propertiesUpdate = new Subject<Property[]>();
  private host: Host;
  hostUpdate = new Subject<Host>();
  private firebaseSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  public fetchHost(idHost: string) {

    this.firebaseSubs.push(this.db.doc<Host>('hosts/' + idHost)
      .valueChanges()
      .subscribe( result => {
        // console.log(result);
        this.host = new Host(result.idHost, result.firstName, result.lastName);
        this.hostUpdate.next(Object.create(this.host));
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
      })
    );
  }

  public fetchProperties(host: Host) {
    this.firebaseSubs.push(this.db
      .collection('hosts/' + host.idHost + '/properties')
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

  addPropertyToFirestore(property: Property) {
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    // console.log(propertyJSON);
    this.db.collection('test').add(propertyJSON);
  }

  addNewErrorMessageDiscovered(code: string, message: string) {
    this.db.collection('error-messages-discovered').add({code: code, message: message});
  }

  cancelSubscriptions() {
    this.firebaseSubs.forEach(sub => sub.unsubscribe());
  }
}
