import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Condo } from './models/condo.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class DataService implements OnDestroy {
  condosSub: Subscription;
  propertyTypeSub: Subscription;
  isAuthSub: Subscription;
  condosList: Condo[];
  propertyTypeList: string[];

  constructor(private db: FirestoreService,
              private store: Store<fromRoot.State>) {
  }

  initDataListener() {
    // Subscribe to Property Type Response
    this.propertyTypeSub = this.db.propertyTypesUpdate.subscribe(res => {
      this.propertyTypeList = res;
      // console.log (this.propertyTypeList);
    });

    // Subscribe to Condos Response
    this.condosSub = this.db.condosUpdate.subscribe(res => {
      this.condosList = res;
      // console.log (this.condosList);
    });

    this.isAuthSub = this.store.select(fromRoot.getIsAuth).subscribe((val) => {
      if (val) {
        this.db.fetchPropertyTypes();
        this.db.fetchCondos();
        this.isAuthSub.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    if (this.condosSub) { this.condosSub.unsubscribe(); }
    if (this.propertyTypeSub) { this.propertyTypeSub.unsubscribe(); }
    if (this.isAuthSub) { this.isAuthSub.unsubscribe(); }
  }
}
