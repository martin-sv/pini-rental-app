import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreService } from '../shared/firestore.service';
import { UIService } from '../shared/ui.service';
import { AuthDataStatic } from './auth-data.static';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  authError = new Subject<any>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: FirestoreService,
              private uiService: UIService) {

                console.log('Constructor Auth');
              }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        AuthDataStatic.setAuthData(new AuthData(user.email, ''));
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/properties']);
        // console.log('User In: ' + user.email);
      } else {
        this.db.cancelSubscriptions();
        this.isAuthenticated = true;
        this.router.navigate(['/signin']);
        this.authChange.next(false);
        // console.log('User Out');
      }
    });
  }

  regusterUser(authData: AuthData): void {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.onLogin(authData);
        // console.log(result);
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
        this.onLogin(authData);
        // console.log(result);
      })
      .catch( error => {
        this.uiService.loadingStateChanged.next(false);
        // console.log(error);
        this.authError.next(error);
      });
  }

  private onLogin(authData: AuthData) {
    AuthDataStatic.setAuthData(authData);
    // this.db.fetchUserID(authData);
    this.uiService.loadingStateChanged.next(false);
  }


  signOut(): void {
    this.afAuth.auth.signOut();
    AuthDataStatic.clearAuthData();
  }

  isAuth(): boolean {
    return this.isAuthenticated != null;
  }
}
