// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  minPasswordLength: 6,
  defaultCheckinTime: 15,
  defaultCheckoutTime: 11,
  firebase: {
    apiKey: 'AIzaSyA8_we0BZNL-cXlFL2sQo33S4KuYALEfbA',
    authDomain: 'pini-rental-app.firebaseapp.com',
    databaseURL: 'https://pini-rental-app.firebaseio.com',
    projectId: 'pini-rental-app',
    storageBucket: 'pini-rental-app.appspot.com',
    messagingSenderId: '1038805737850'
  }
};



/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
