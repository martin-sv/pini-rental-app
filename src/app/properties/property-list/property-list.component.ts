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
  public host: Host;
  // public get host() {return this._host; }
  // public set host(value: Host) { this._host = value; }
  public properties: Property[];
  public propertiesSub: Subscription;
  public hostSub: Subscription;
  public authChangeSub: Subscription;
  // TODO: Pasar todos a private

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: FirestoreService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authChangeSub = this.authService.authChange.subscribe(logedIn => {
      // console.log('Auth Change Subscriber ' + logedIn);
      if (logedIn) { this.fetchHostAndProperties(); }
    });
  }

  fetchHostAndProperties() {
    this.hostSub = this.db.hostUpdate.subscribe(res => {
      res.idHost = AuthDataStatic.authData.email;
      this.host = res;
      this.host.idHost = AuthDataStatic.authData.email;
      this.db.fetchMyProperties(this.host);
      // console.log(this.host);
    });
    this.propertiesSub = this.db.propertiesUpdate.subscribe(res => {
      this.properties = res;
      // console.log (this.properties);
    });
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onAddPropertyClick() {
    // console.log(this.host);
    this.db.addMyProperty(DataMock.generateProperty(this.host));
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
    // if (this.authChangeSub) { this.authChangeSub.unsubscribe(); }
  }
}
