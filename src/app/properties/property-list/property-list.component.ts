import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { DataMock } from '../../shared/dataMock';
import { Property } from '../../shared/property.model';
import { Host } from '../../shared/host.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';
import { Observable, Subscription } from 'rxjs';
import { AuthDataStatic } from '../../auth/auth-data.static';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  host: Host;
  properties: Property[];
  propertiesSub: Subscription;
  hostSub: Subscription;
  authChangeSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: FirestoreService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authChangeSub = this.authService.authChange.subscribe(logedIn => {
      if (logedIn) { this.fetch(); }
    });
  }

  fetch() {
    this.hostSub = this.db.hostUpdate.subscribe ( res => {
      this.host = res;
      this.host.idHost = AuthDataStatic.authData.email;
      // console.log(res);
      this.db.fetchMyProperties(this.host);
    });
    this.propertiesSub = this.db.propertiesUpdate.subscribe( res => {
      // console.log (res);
      this.properties = res;
    });
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onAddPropertyClick() {
    this.db.addPropertyToFirestore(DataMock.generateProperty(this.host));
  }

  onAddGuestClick() {
    // TODO: Implement
  }

  onPropertyClick(idProperty: number) {
    // console.log('idProperty: ' + id);
    this.router.navigate(['./', idProperty], {relativeTo: this.route});
  }

  onPropertyCardClick(idProperty: string) {
    this.db.removeMyProperty(idProperty);
  }

  ngOnDestroy() {
    if (this.propertiesSub) { this.propertiesSub.unsubscribe(); }
    if (this.hostSub) { this.hostSub.unsubscribe(); }
    if (this.authChangeSub) { this.authChangeSub.unsubscribe(); }
  }
}
