import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authServce: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authServce.authChange.subscribe(authStatus => {  // No neede to unsubscribe to the event.
    //   this.isAuth = authStatus;
    // });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onSignOut() {
    this.authServce.signOut();
  }
}
