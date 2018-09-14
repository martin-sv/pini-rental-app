import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs';
import { PropertiesService } from '../properties/properties.service';
import { CheckIn } from '../shared/models/checkIn.model';
import { getMomentLocaleData } from 'fullcalendar/src/locale';
import { newMomentProto } from 'fullcalendar/src/moment-ext';

@Injectable()
export class EventsSesrvice {
  private data: {id: string, title: string, start: string, end?: string}[] = [];
  onDataUpdate = new Subject<any>();

  constructor(private propertiesService: PropertiesService) {
    this.propertiesService.checkinsUpdate.subscribe((checkins: CheckIn[]) => {
      checkins.forEach(checkin => {
        console.log(checkin.guest.fullName + ' - ' + checkin.checkingDateTime + ' - ' + checkin.checkoutDateTime);
        this.data.push({
          id: 'a',
          title: checkin.idHost + ': ' + checkin.guest.fullName,
          start: checkin.checkingDateTime,
          end: checkin.checkoutDateTime,
        });
      });
      this.onDataUpdate.next(this.data);
    });
  }


    private fullData() {
      const dateObj = new Date();
      const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
      const data = [{
          title: 'All Day Event',
          start: yearMonth + '-01'
      },
      {
          title: 'Long Event',
          start: yearMonth + '-07',
          end: yearMonth + '-10'
      },
      {
          id: 999,
          title: 'Repeating Event',
          start: yearMonth + '-09T16:00:00'
      },
      {
          id: 999,
          title: 'Repeating Event',
          start: yearMonth + '-16T16:00:00'
      },
      {
          title: 'Conference',
          start: yearMonth + '-11',
          end: yearMonth + '-13'
      },
      {
          title: 'Meeting',
          start: yearMonth + '-12T10:30:00',
          end: yearMonth + '-12T12:30:00'
      },
      {
          title: 'Lunch',
          start: yearMonth + '-12T12:00:00'
      },
      {
          title: 'Meeting',
          start: yearMonth + '-12T14:30:00'
      },
      {
          title: 'Happy Hour',
          start: yearMonth + '-12T17:30:00'
      },
      {
          title: 'Dinner',
          start: yearMonth + '-12T20:00:00'
      },
      {
          title: 'Birthday Party',
          start: yearMonth + '-13T07:00:00'
      },
      {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: yearMonth + '-28'
      }];
      return data;
    }
}
