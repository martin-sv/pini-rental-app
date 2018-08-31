import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FirestoreService } from '../../shared/firestore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  authErrorObs: Subscription;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private translate: TranslateService,
              private db: FirestoreService) { }

  ngOnInit() {
    this.authErrorObs = this.authService.authError.subscribe( error => {
      // console.log(error);
      this.translate.get('FIREBASE.' + error.code).subscribe((translatedText: string) => {
        if (!translatedText.includes(error.code)) {
          this.snackBar.open(translatedText, null, { duration: 5000});
        } else {
          this.snackBar.open(error.message, null, { duration: 5000});
          this.db.addNewErrorMessageDiscovered(error.code, error.message);
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
