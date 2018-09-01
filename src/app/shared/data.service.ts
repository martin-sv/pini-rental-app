import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Condo } from './models/condo.model';

@Injectable()
export class DataService implements OnDestroy {
  condosSub: Subscription;
  public condosList: Condo[];

  constructor(private db: FirestoreService) {
  }

  initDataListener() {
    // Subscribe to Condos Response
    this.condosSub = this.db.condosUpdate.subscribe(res => {
      this.condosList = res;
      // console.log (this.condosList);
    });
    this.db.fetchCondos();
  }

  ngOnDestroy() {
    if (this.condosSub) { this.condosSub.unsubscribe(); }
  }
}
