import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authErrorSub: Subscription;
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  isLoadingSub: Subscription;

// isAuth = false;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.store.subscribe(data => console.log(data));
    // Init & Add Validators
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });

    // Show Spinner if Loading
    // this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
    //   this.isLoading = isLoading;
    // });
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // Subscribe and show Firebase errors.
    this.authErrorSub = this.authService.authError.subscribe( error => {
      this.uiService.showSnackbar(error.code, error.message, null);
    });


  }

  onSubmit() {
    // console.log(this.loginForm);
    this.authService.signIn(new AuthData(this.loginForm.value.email, this.loginForm.value.password));
  }

  // ngOnDestroy() {
  //   if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
  //   if (this.isLoadingSub) {this.isLoadingSub.unsubscribe(); }
  // }
}
