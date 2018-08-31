import { AngularFirestore } from 'angularfire2/firestore';
import { Host } from './host.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Property } from './property.model';
import { PropertyClassEnum } from './propertyClassEnum';

@Injectable()
export class FirestoreService {
  private properties: Array<Property>;
  propertiesUpdate = new Subject<Property[]>();
  private host: Host;
  hostUpdate = new Subject<Host>();

  constructor(private db: AngularFirestore) {}

  public fetchHost(idHost: string) {

    this.db.doc<Host>('hosts/' + idHost)
      .valueChanges()
      .subscribe( result => {
        // console.log(result);
        this.host = new Host(result.idHost, result.firstName, result.lastName);
        this.hostUpdate.next(Object.create(this.host));
    });
  }

  public fetchProperties(host: Host) {
    this.db
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
      .subscribe((props: Array<Property>) => {
        // console.log(props);
        this.properties = props;
        this.propertiesUpdate.next(Object.create(this.properties));
      });
  }

  addPropertyToFirestore(property: Property) {
    const propertyJSON = JSON.parse(JSON.stringify(property));
    delete propertyJSON.host;
    // console.log(propertyJSON);
    this.db.collection('test').add(propertyJSON);
  }
}
