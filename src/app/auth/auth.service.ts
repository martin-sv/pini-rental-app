import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreService } from '../shared/firestore.service';
import { UIService } from '../shared/ui.service';
import { AuthDataStatic } from './auth-data.static';
import { Host } from '../shared/models/host.model';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  authError = new Subject<any>();
  private isAuthenticated = false;
  get isAuth(): boolean { return this.isAuthenticated; }

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: FirestoreService,
              private uiService: UIService,
              private store: Store<{ui: fromRoot.State}>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // console.log('User In: ' + user.email);
        AuthDataStatic.setAuthData(new AuthData(user.email, ''));
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/properties']);
      } else {
        // console.log('User Out');
        this.db.cancelSubscriptions();
        this.isAuthenticated = false;
        this.router.navigate(['/signin']);
        this.authChange.next(false);
      }
    });
  }

  regusterUser(authData: AuthData, newHost: Host): void {
    // this.uiService.loadingStateChanged.next(true);  // Shown before the request since it starts loading as soon as an action ocurs.
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.onLogin(authData);
        this.db.addNewHost(newHost);
        // console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch( error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        // console.log(error);
        this.authError.next(error);
      });
  }

  signIn(authData: AuthData): void {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password)
      .then(result => {
        this.onLogin(authData);
        // console.log(result);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch( error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        // console.log(error);
        this.authError.next(error);
      });
  }

  private onLogin(authData: AuthData) {
    AuthDataStatic.setAuthData(authData);
    this.uiService.loadingStateChanged.next(false);
  }


  signOut(): void {
    this.afAuth.auth.signOut();
    AuthDataStatic.clearAuthData();
  }
}
