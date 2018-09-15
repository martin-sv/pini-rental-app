import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { EventsSesrvice } from './events.service';
import * as $ from 'jquery';
import 'moment';
import 'fullcalendar';
import { Moment } from 'moment';
import 'fullcalendar-scheduler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // calendarOptions;
  calendarOptions: OptionsInput;
  // @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private eventsService: EventsSesrvice) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.eventsService.getEvents().subscribe(data => {
      this.eventsService.onDataUpdate.subscribe(data => {
        console.log('onDataUpdate');
        console.log(data);

        const dateObj = new Date();
        const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        const myData = [{
          title: 'All Day Event',
          start: yearMonth
        }];

        const events2 = [
          {
            resourceID: 'a',
            title: 'event1',
            start: 'Sun, 09 Sep 2018 04:00:00 GMT',
            end: 'Tue, 11 Sep 2018 04:00:00 GMT'
          /*
          },
          {
            title: 'event2',
            start: '2018-09-14T14:30:00',
            end: '2018-09-16T15:30:00'
          },
          {
            title  : 'event3',
            start  : '2018-09-14',
            */
          }];

          this.calendarOptions = {
            editable: true,
            eventLimit: 5,
            header: {
              left: 'prev,next today',
              center: 'title',
              // center: 'month,timelineFourDays',
              right: 'timelineMont,month,agendaWeek,agendaDay,listMonth'
              // right: 'timelineDay, timelineWeek, timelineMonth,timelineYear'
            },
            contentHeight: 'auto',
            displayEventEnd: true,
            displayEventTime: true,
            eventDurationEditable: true,
            eventStartEditable: true,
            schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
            resources: [
              { id: 'a', title: 'Room A' },
              { id: 'b', title: 'Room B' },
              { id: 'c', title: 'Room C' },
              { id: 'd', title: 'Room D' }
            ],
            // defaultView: 'timelineMonth',
            events: data,
            timeFormat: 'hh:mm',
          };

          const containerEl: JQuery = $('app-dashboard');
          containerEl.fullCalendar(this.calendarOptions);
          /*
        this.calendarOptions = {
          editable: true,
          eventLimit: 5,
          header: {
            left: 'prev,next today',
            center: 'title',
            // center: 'month,timelineFourDays',
            right: 'timelineMont,month,agendaWeek,agendaDay,listMonth'
            // right: 'timelineDay, timelineWeek, timelineMonth,timelineYear'
          },
          contentHeight: 'auto',
          displayEventEnd: true,
          displayEventTime: true,
          eventDurationEditable: true,
          eventStartEditable: true,
          schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
          resources: [
            { id: 'a', title: 'Room A' },
            { id: 'b', title: 'Room B' },
            { id: 'c', title: 'Room C' },
            { id: 'd', title: 'Room D' }
          ],
          defaultView: 'timelineMonth',
          events: data,
        };
        */


      });


    }

  // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  // defaultView: 'timelineDay'


  eventClick() {
    /*
    console.log('event');
    const data = this.eventsService.data;
    console.log(data);
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: data
    };
    */

    const el = {
      title: 'New event',
      start: '2018-09-07',
      end: '2018-09-10',
      color: '#257e4a'
    };
    /*
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
    this.ucCalendar.fullCalendar({
      resources: [
        {
          id: 'a',
          title: 'Room A'
        },
        {
          id: 'b',
          title: 'Room B'
        }
      ]
    });

    this.ucCalendar.fullCalendar({
      defaultView: 'timelineDay'
    });
    this.ucCalendar.fullCalendar({
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source'
    });
    */
  }

  updateEvent(event) {

  }

  clickButton(event) {

  }
}
