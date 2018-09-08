import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private afAuth: AngularFireAuth) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.search('properties') === 1) {
      return this.afAuth.authState.pipe(take(1), map(user => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }));
      // return (this.store.select(fromRoot.getIsAuth).pipe(take(1)));
    } else {
      return this.afAuth.authState.pipe(take(1), map(user => {
        if (user) {
          return false;
        } else {
          return true;
        }
      }));
      // return (this.store.select(fromRoot.getIsUnAuth).pipe(take(1)));
    }
  }

  canLoad(route: Route) {
    return true;
    // return (this.store.select(fromRoot.getIsAuth).pipe(take(1)));
    // console.log('canload!!!!!');
    // if (this.authService.isAuth) {
    //   return true;
    // } else {
    //   this.router.navigate(['/signin']);
    // }
  }

}
