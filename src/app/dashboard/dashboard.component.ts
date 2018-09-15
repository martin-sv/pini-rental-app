import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { EventsSesrvice } from './events.service';
import 'fullcalendar-scheduler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private eventsService: EventsSesrvice) {}

  ngOnInit() {
    // this.eventsService.getEvents().subscribe(data => {
    this.eventsService.onDataUpdate.subscribe(data => {
      console.log('onDataUpdate');
      console.log(data);
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
        timeFormat: 'HH:mm',
      };
    });
  }

  eventClick() {
    console.log('event');
    const data = null;
    console.log(data);
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: data,
    };


    const el = {
      title: 'New event',
      start: '2018-09-07',
      end: '2018-09-10'
    };
    this.ucCalendar.fullCalendar('renderEvent', data);
    this.ucCalendar.fullCalendar('rerenderEvents');

    // this.eventsService.getEvents();
  }
}
