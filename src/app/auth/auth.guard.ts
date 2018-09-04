import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
// export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>) {}
  // constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (this.store.select(fromRoot.getIsAuth).pipe(take(1)));

    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/signin']);
    // }
  }

  canLoad(route: Route) {
    return (this.store.select(fromRoot.getIsAuth).pipe(take(1)));

    // if (this.authService.isAuth) {
    //   return true;
    // } else {
    //   this.router.navigate(['/signin']);
    // }
  }

}
