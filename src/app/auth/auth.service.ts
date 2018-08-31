import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  // private user: User;
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {}

  regusterUser(authData: AuthData): void {
    // this.user = new User(Math.round(Math.random() * 1000), authData.email);
    // this.authSuccessfully(authData);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then( result => {
        console.log(result);
        this.authSuccessfully(authData);
      })
      .catch( error => {
        console.log(error);
      });
  }

  signIn(authData: AuthData): void {
    // this.user = new User(Math.round(Math.random() * 1000), authData.email);
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then( result => {
        console.log(result);
        this.authSuccessfully(authData);
      })
      .catch( error => {
        console.log(error);
      });
  }

  private authSuccessfully(authData: AuthData) {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/properties']);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.isAuthenticated = true;
    this.authChange.next(false);
    this.router.navigate(['/signin']);
  }

  // getUser(): User {
  //   // TODO: Creo que esto no anda
  //   return { ...this.user };  // Creates a new object to avoid returning the reference to the user.
  // }

  isAuth(): boolean {
    return this.isAuthenticated != null;
  }
}
