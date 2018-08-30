import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  regusterUser(authData: AuthData): void {
    this.user = new User(Math.round(Math.random() * 1000), authData.email);
    this.authSuccessfully(authData);
  }

  signIn(authData: AuthData): void {
    this.user = new User(Math.round(Math.random() * 1000), authData.email);
    this.authSuccessfully(authData);
  }

  private authSuccessfully(authData: AuthData) {
    this.authChange.next(true);
    this.router.navigate(['/properties']);
  }

  signOut(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/signin']);
  }

  getUser(): User {
    return { ...this.user };  // Creates a new object to avoid returning the reference to the user.
  }

  isAuth(): boolean {
    return this.user != null;
  }
}
