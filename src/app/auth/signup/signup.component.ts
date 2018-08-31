import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  authErrorObs: Subscription;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit() {
    this.authErrorObs = this.authService.authError.subscribe( error => {
      // console.log(error);
      this.translate.get('FIREBASE.' + error.code).subscribe((translatedText: string) => {
        if (!translatedText.includes(error.code)) {
          this.snackBar.open(translatedText, null, { duration: 5000});
        } else {
          this.snackBar.open(error.message, null, { duration: 5000});
        }
      });
    });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.authService.regusterUser(new AuthData(form.value.email, form.value.password));
  }

  ngOnDestroy() {
    this.authErrorObs.unsubscribe();
  }
}
