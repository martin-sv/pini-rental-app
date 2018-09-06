import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription, Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  authErrorSub: Subscription;
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.State>,
              private router: Router) { }

  ngOnInit() {
    // Init & Add Validators
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

    // Subscribe and show Firebase errors.
    this.authErrorSub = this.store.select(fromRoot.onAuthError).subscribe( error => {
      this.uiService.showSnackbar(error.code, error.message, null);
    });
  }

  onSubmit() {
    // console.log(this.loginForm);
    this.authService.signIn(new AuthData(this.loginForm.value.email, this.loginForm.value.password));
  }

  ngOnDestroy() {
    if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
  }
}
