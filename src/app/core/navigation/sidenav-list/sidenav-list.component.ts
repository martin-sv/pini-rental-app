import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authServce: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authServce.authChange.subscribe( authStatus => {
    //   this.isAuth = authStatus;
    // });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onSignOut() {
    this.onClose();
    this.authServce.signOut();
  }
}
