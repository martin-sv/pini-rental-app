import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  authErrorSub: Subscription;
  isLoading = false;
  isLoadingSub: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    // Show Spinner if Loading
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });

    // Subscribe and show Firebase errors.
    this.authErrorSub = this.authService.authError.subscribe( error => {
      this.uiService.showSnackbar(error.code, error.message, null);
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.regusterUser(new AuthData(form.value.email, form.value.password));
  }

  ngOnDestroy() {
    if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
    if (this.isLoadingSub) {this.isLoadingSub.unsubscribe(); }
  }
}
