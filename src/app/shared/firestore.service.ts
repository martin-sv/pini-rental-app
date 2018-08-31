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

  public fetchHost() {
    // return new Host();
  }

  public async fetchProperties(host: Host) {
    this.db
      .collection('properties')
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
      .subscribe( (props: Array<Property>) => {
        // console.log(props);
        this.properties = props;
        this.propertiesUpdate.next(Object.create(this.properties));
      });
  }

  private addPropertyToFirestore(property: Property) {
    this.db.collection('test').add(property);
  }
}
