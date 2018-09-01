import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Host } from '../../shared/host.model';
import { Address } from '../../shared/address.model';


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
    const authData = new AuthData(form.value.email, form.value.password);
    const host = new Host(
      form.value.first_name,
      form.value.last_name,
      form.value.phone,
      form.value.email,
      new Address(form.value.street, form.value.city, form.value.state, form.value.country));
    this.authService.regusterUser(authData, host);
  }

  ngOnDestroy() {
    if (this.authErrorSub) { this.authErrorSub.unsubscribe(); }
    if (this.isLoadingSub) {this.isLoadingSub.unsubscribe(); }
  }
}
