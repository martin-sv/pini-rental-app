import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DataMock } from './shared/dataMock';
import { Host } from './shared/models/host.model';
import { Property } from './shared/models/property.model';
import { AuthService } from './auth/auth.service';
import { AuthData } from './auth/auth-data.model';
import { FirestoreService } from './shared/firestore.service';
import { PropertiesService } from './properties/properties.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  private startLogedin = false;

  constructor(public translate: TranslateService,
              public authService: AuthService,
              public db: FirestoreService,
              private propertiesService: PropertiesService,
              private titleService: Title) {
  // titleService.setTitle('Pini Rental');

  // Start Translations Service
  this.configureTranslations();

  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.propertiesService.initPropertiesListener();
  }

  ngAfterViewInit() {
    if (this.startLogedin) {
      setTimeout(() => {
        this.authService.signIn(new AuthData('asd@asd.com', '123456'));
      }, 10);
    }
  }

  private configureTranslations() {
    const defaultLanguage = 'es';  // TODO: Llevar a un archivo de configuracion.
    this.translate.addLangs(['en', 'es']);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(defaultLanguage);

    const browserLang = this.translate.getBrowserLang();
    // this.translate.use(browserLang.match(/en|es/) ? browserLang : defaultLanguage);
    // TODO: La primera vez que se loguean, detectar el idioma y guardarlo.

    /* Ejemplo con parametros
    HTML:
    <h2>{{ 'HOME.TITLE2' | translate:{value : 'Valor a Pasar'} }}</h2>
    json:
    "TITLE": "Bienvenido a Pini Rental! {{ value }}"
    */
  }

  private generateMockData() {
    const host: Host = DataMock.generateHost();
    const properties: Property[] = DataMock.generateProperties(host, 5);
  }
}
