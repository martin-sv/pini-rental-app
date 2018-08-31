import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authServce: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authServce.authChange.subscribe(authStatus => {  // No neede to unsubscribe to the event.
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onSignOut() {
    this.authServce.signOut();
  }

  ngOnDestroy() {
    if (this.authSubscription) { this.authSubscription.unsubscribe(); }
  }
}
