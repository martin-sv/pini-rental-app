import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { DataMock } from '../../shared/dataMock';
import { Property } from '../../shared/property.model';
import { Host } from '../../shared/host.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  host: Host;
  properties: Property[];
  propertiesSubscription: Subscription;
  hostSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: FirestoreService) { }

  ngOnInit() {

    this.fetch();
  }

  fetch() {
    this.hostSubscription = this.db.hostUpdate.subscribe ( res => {
      this.host = res;
      this.host.idHost = 'K1Zj0FQYCFxWXoFlTTTV';
      // console.log(this.host);
      this.db.fetchProperties(this.host);
    });
    this.propertiesSubscription = this.db.propertiesUpdate.subscribe( res => {
      // console.log (res);
      this.properties = res;
    });
    this.db.fetchHost('K1Zj0FQYCFxWXoFlTTTV');
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onAddPropertyClick() {
    this.db.addPropertyToFirestore(new Property('1', this.host, 'name', 1, 'address', 150, 'q'));
  }

  onAddGuestClick() {
    // TODO: Implement
  }

  onPropertyClick(id: number) {
    // console.log('idProperty: ' + id);
    this.router.navigate(['./', id], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
    this.hostSubscription.unsubscribe();
  }
}
