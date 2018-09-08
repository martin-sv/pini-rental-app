import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, concatMap, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { AuthData } from '../auth-data.model';
import { Host } from '../../shared/models/host.model';
import { AngularFireAuth } from 'angularfire2/auth';
import * as UI from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Router } from '@angular/router';
import { FirestoreService } from '../../shared/firestore.service';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
  .ofType(AuthActions.TRY_SIGNUP)
  .pipe(map((action: AuthActions.TrySignup) => {
    // console.log(action.payload);
    return action.payload;
  })
  , switchMap((data: {authData: AuthData, host: Host}) => {
    return fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(
      data.authData.email,
      data.authData.password)
      .then(() => {
        this.db.addNewHost(data.host);
        this.store.dispatch(new UI.StopLoading());
        this.router.navigate(['/properties']);
        return {type: AuthActions.TRY_SIGNUP_SUCCESS};
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        return { type: AuthActions.AUTH_ERROR, payload: error };
      }));
  }));

  @Effect()
  authSignin = this.actions$.pipe(
  ofType<AuthActions.TrySignin> (AuthActions.TRY_SIGNIN)
  , concatMap(data => {
    this.store.dispatch(new UI.StartLoading());
    return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(
      data.payload.authData.email,
      data.payload.authData.password)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
        this.router.navigate(['/properties']);
        return {type: AuthActions.TRY_SIGNIN_SUCCESS};
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        return { type: AuthActions.AUTH_ERROR, payload: error };
      }));
  }));

  @Effect()
  authSignout = this.actions$.pipe(
  ofType<AuthActions.Signout> (AuthActions.SIGN_OUT)
  , concatMap(() => {
    return fromPromise(this.afAuth.auth.signOut()
    .then(() => ({ type: AuthActions.SIGN_OUT_COMPLETE})));
  }));

  constructor (private actions$: Actions,
               private afAuth: AngularFireAuth,
               private store: Store<fromRoot.State>,
               private router: Router,
               private db: FirestoreService) {}
}

