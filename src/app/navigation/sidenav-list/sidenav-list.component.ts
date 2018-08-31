import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authServce: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authServce.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onSignOut() {
    this.onClose();
    this.authServce.signOut();
  }

  ngOnDestroy() {
    if (this.authSubscription) { this.authSubscription.unsubscribe(); }
  }

}
