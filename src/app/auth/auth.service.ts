import { Store } from '@ngrx/store';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirestoreService } from '../shared/firestore.service';
import { AuthDataStatic } from './auth-data.static';
import * as fromRoot from '../app.reducer';
import * as Auth from './store/auth.actions';
import { take } from 'rxjs/operators';
import { UserRolesEnum } from './userRolesEnum';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class AuthService {
  onUserRoleUpdate = new ReplaySubject<string>(1);

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private db: FirestoreService,
              private store: Store<fromRoot.State>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // console.log('User In: ' + user.email);
        AuthDataStatic.setAuthData(new AuthData(user.email, ''));
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.db.userUpdate.subscribe(userRole => {
          AuthDataStatic.authData.role = userRole as UserRolesEnum;
          this.onUserRoleUpdate.next(userRole as UserRolesEnum);
          // this.store.dispatch(new Auth.RoleUpdate({userRole: userRole as UserRolesEnum}));
        });
        this.db.fetchUser(user.email);
        // this.router.navigate(['/properties']);
      } else {
        // console.log('User Out');
        this.db.cancelSubscriptions();
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        AuthDataStatic.authData.role = UserRolesEnum.ANONYMOUS;
        AuthDataStatic.clearAuthData();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/signin']);
      }
    });
  }

  /*
  signOut(): void {
    this.afAuth.auth.signOut();
  }

  regusterUser(authData: AuthData, newHost: Host): void {
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
        // this.authError.next(error);
        this.store.dispatch(new Auth.AuthError(error));
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
        // console.log(typeof error);
        // this.authError.next(error);
        this.store.dispatch(new Auth.AuthError(error));
      });
  }

  private onLogin(authData: AuthData) {
    AuthDataStatic.setAuthData(authData);
    this.uiService.loadingStateChanged.next(false);
  }
  */

}
