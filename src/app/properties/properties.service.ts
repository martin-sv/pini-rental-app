import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FirestoreService } from '../shared/firestore.service';
import { Host } from '../shared/host.model';
import { Property } from '../shared/property.model';
import { AuthDataStatic } from '../auth/auth-data.static';
import { DataMock } from '../shared/dataMock';

@Injectable()
export class PropertiesService implements OnDestroy {
  public host: Host;
  public properties: Property[];
  private propertiesSub: Subscription;
  private hostSub: Subscription;
  private authChangeSub: Subscription;

  constructor(private authService: AuthService,
              private db: FirestoreService) {}

  public initPropertiesListener() {
    // Subscribe to AuthChange
    this.authChangeSub = this.authService.authChange.subscribe(logedIn => {
      // console.log('Auth Change Subscriber ' + logedIn);
      if (logedIn) { this.fetchHostAndProperties(); }
    });

    // Subscribe to Host Response
    this.hostSub = this.db.hostUpdate.subscribe(res => {
      res.idHost = AuthDataStatic.authData.email;
      this.host = res;
      this.host.idHost = AuthDataStatic.authData.email;
      this.db.fetchMyProperties(this.host);
      // console.log(this.host);
    });

    // Subscribe to Properties Response
    this.propertiesSub = this.db.propertiesUpdate.subscribe(res => {
      this.properties = res;
      // console.log (this.properties);
    });
  }

  private fetchHostAndProperties() {
    this.db.fetchHost(AuthDataStatic.authData.email);
  }

  public addMyProperty() {
    this.db.addMyProperty(DataMock.generateProperty(this.host));
  }

  public removeMyProperty(idProperty: string) {
    this.db.removeMyProperty(idProperty);
  }

  ngOnDestroy() {
    if (this.propertiesSub) { this.propertiesSub.unsubscribe(); }
    if (this.hostSub) { this.hostSub.unsubscribe(); }
    if (this.authChangeSub) { this.authChangeSub.unsubscribe(); }
  }

}
