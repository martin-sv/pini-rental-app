import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription, Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Host } from '../../shared/models/host.model';
import { PeopleAddress } from '../../shared/models/peopleAddress.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  authErrorSub: Subscription;
  isLoadingSub: Subscription;
  isLoading$: Observable<boolean>;
  get isAuth() { return this.authService.isAuth; }

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<{ui: fromApp.State}>) { }

  ngOnInit() {
    // Show Spinner if Loading
    // this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
    //   this.isLoading = isLoading;
    // });
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

    // Subscribe and show Firebase errors.
    this.authErrorSub = this.authService.authError.subscribe( error => {
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
    // if (this.isLoadingSub) {this.isLoadingSub.unsubscribe(); }
  }
}
