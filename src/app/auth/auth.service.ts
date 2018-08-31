import { Subject } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreService } from '../shared/firestore.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  // private user: User;
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private firestoreService: FirestoreService) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/properties']);
      } else {
        this.firestoreService.cancelSubscriptions();
        this.isAuthenticated = true;
        this.authChange.next(false);
        this.router.navigate(['/signin']);
      }
    });
  }

  regusterUser(authData: AuthData): void {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccessfully(authData);
      })
      .catch( error => {
        console.log(error);
      });
  }

  signIn(authData: AuthData): void {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccessfully(authData);
      })
      .catch( error => {
        console.log(error);
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated != null;
  }
}
