import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  authErrorObs: Subscription;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private db: FirestoreService) { }

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

    // Subscribe and show Firebase errors.
    this.authErrorObs = this.authService.authError.subscribe( error => {
      // console.log(error);
      this.translate.get('FIREBASE.' + error.code).subscribe((translatedText: string) => {
        console.log(error.code);
        if (!translatedText.includes(error.code)) {
          this.snackBar.open(translatedText, null, { duration: 5000});
        } else {
          this.snackBar.open(error.message, null, { duration: 5000});
          this.db.addNewErrorMessageDiscovered(error.code, error.message);
        }
      });
    });
  }

  onSubmit() {
    // console.log(this.loginForm);
    this.authService.signIn(new AuthData(this.loginForm.value.email, this.loginForm.value.password));
  }

  ngOnDestroy() {
    this.authErrorObs.unsubscribe();
  }
}
