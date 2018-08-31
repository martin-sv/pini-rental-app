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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: FirestoreService) { }

  ngOnInit() {

    this.fetch();
  }

  fetch() {
    this.propertiesSubscription = this.db.propertiesUpdate.subscribe( res => {
      this.properties = res;
    });
    this.host = DataMock.host;
    // this.host = this.db.fetchHost();
    this.db.fetchProperties(this.host);
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onPropertyClick(id: number) {
    // console.log('idProperty: ' + id);
    this.router.navigate(['./', id], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }
}
