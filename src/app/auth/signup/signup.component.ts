import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { UIService } from '../../shared/ui.service';
import { Host } from '../../shared/models/host.model';
import { PeopleAddress } from '../../shared/models/peopleAddress.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  authErrorSub: Subscription;
  isLoading$: Observable<boolean>;
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

    // Subscribe and show Firebase errors.
    this.store.select(fromRoot.onAuthError).subscribe( error => {
      this.uiService.showSnackbar(error.code, error.message, null);
    });

  }

  onSubmit(form: NgForm) {
    // console.log(form);
    const authData = new AuthData(form.value.email, form.value.password);
    const host = new Host(
      form.value.first_name,
      form.value.last_name,
      form.value.phone,
      form.value.email,
      new PeopleAddress(form.value.street, form.value.apartment, form.value.city, form.value.state, form.value.country));
    this.authService.regusterUser(authData, host);
  }


  ngOnDestroy() {
    if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
  }
}
