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
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private db: FirestoreService,
              private propertiesService: PropertiesService,
              private dataService: DataService,
              private titleService: Title) {
  // titleService.setTitle('Pini Rental');

  // Start Translations Service
  this.configureTranslations();

  this.authService.initAuthListener();
  this.propertiesService.initPropertiesListener();
  this.dataService.initDataListener();


  }

  ngOnInit() { }

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
}
