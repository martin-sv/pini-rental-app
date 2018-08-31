import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  authErrorSub: Subscription;
  loginForm: FormGroup;
  isLoading = false;
  isLoadingSub: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    // Add Validators
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });

    // Show Spinner if Loading
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    // Subscribe and show Firebase errors.
    this.authErrorSub = this.authService.authError.subscribe( error => {
      this.uiService.showSnackbar(error.code, error.message, null);
    });


  }

  onSubmit() {
    // console.log(this.loginForm);
    this.authService.signIn(new AuthData(this.loginForm.value.email, this.loginForm.value.password));
  }

  ngOnDestroy() {
    if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
    if (this.isLoadingSub) {this.isLoadingSub.unsubscribe(); }
  }
}
