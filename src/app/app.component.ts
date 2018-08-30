import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { DataMock } from './shared/dataMock';
import { Host } from './shared/host.model';
import { Property } from './shared/property.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService,
              private titleService: Title) {
  // titleService.setTitle('Pini Rental');

  // Start Translations Service
  this.configureTranslations();

  }

  ngOnInit() {
    // this.testMock();
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

  private testMock() {
    const host: Host = DataMock.generateHost();
    console.log(host.firstName);
    host.firstName = 'B';
    console.log(DataMock.host.firstName);
    console.log(host.firstName);
    const properties: Array<Property> = DataMock.generateProperties(host, 5);
    console.log('Host: ' + host);
    console.log('Properties: ' + properties);
  }
}
