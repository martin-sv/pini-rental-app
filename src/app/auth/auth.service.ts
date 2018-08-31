import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreService } from '../shared/firestore.service';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  authError = new Subject<any>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private firestoreService: FirestoreService,
              private uiService: UIService) {}

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
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(result);
        // this.authSuccessfully(authData);
      })
      .catch( error => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(error);
        this.authError.next(error);
      });
  }

  signIn(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(result);
        // this.authSuccessfully(authData);
      })
      .catch( error => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(error);
        this.authError.next(error);
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

  isAuth(): boolean {
    return this.isAuthenticated != null;
  }
}
