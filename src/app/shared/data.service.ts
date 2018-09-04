import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Condo } from './models/condo.model';

@Injectable()
export class DataService implements OnDestroy {
  condosSub: Subscription;
  propertyTypeSub: Subscription;
  public condosList: Condo[];
  propertyTypeList: string[];

  constructor(private db: FirestoreService) {
  }

  initDataListener() {
    this.db.fetchCondos();
    this.db.fetchPropertyTypes();

    /*
    // Subscribe to Condos Response
    this.condosSub = this.db.condosUpdate.subscribe(res => {
      this.condosList = res;
      // console.log (this.condosList);
    });
    this.db.fetchCondos();

    // Subscribe to Property Type Response
    this.propertyTypeSub = this.db.propertyTypesUpdate.subscribe(res => {
      this.propertyTypeList = res;
      // console.log (this.propertyTypeList);
    });
    this.db.fetchPropertyTypes();
    */
  }

  ngOnDestroy() {
    if (this.condosSub) { this.condosSub.unsubscribe(); }
    if (this.propertyTypeSub) { this.propertyTypeSub.unsubscribe(); }
  }
}
