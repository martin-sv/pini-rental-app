import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar,
              private translate: TranslateService,
              private db: FirestoreService) {}

  showSnackbar(messageCode: string, altText: string, action: string, duration = 4000) {
    if (messageCode !== '') {
      this.translate.get('FIREBASE.' + messageCode).subscribe((translatedText: string) => {
        // console.log(translatedText);
        if (!translatedText.includes(messageCode)) {
          this.snackBar.open(translatedText, null, { duration: duration});
        } else {
          this.snackBar.open(altText, null, { duration: duration});
          this.db.addNewErrorMessageDiscovered(messageCode, altText);
        }
      });
    }
  }
}
