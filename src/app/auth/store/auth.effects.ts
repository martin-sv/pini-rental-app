/*
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs';
import { AuthData } from '../auth-data.model';
import { Host } from '../../shared/models/host.model';
import * as angularFireAuth from 'angularfire2/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
  .ofType(AuthActions.TRY_SIGNUP)
  .pipe(map((action: AuthActions.TrySignup) => {
    return action.payload;
  })
  , switchMap((data: {authData: AuthData, host: Host}) => {
    return fromPromise(angularFireAuth.AngularFireAuth.)
  });

  this.afAuth.auth.createUserWithEmailAndPassword

  constructor (private actions$: Actions) {}
}
*/
