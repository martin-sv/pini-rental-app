import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { from } from 'rxjs';
import { AuthData } from '../auth-data.model';
import { Host } from '../../shared/models/host.model';
import { AngularFireAuth } from 'angularfire2/auth';

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
      data.authData.password));
  })
  , map((result: any) => {
    console.log(result);
  }));

  constructor (private actions$: Actions,
               private afAuth: AngularFireAuth ) {}
}

