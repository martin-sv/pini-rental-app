import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { OptionsInput } from 'fullcalendar';
import { EventsSesrvice } from './events.service';

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
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        contentHeight: 'auto',
        events: data,
        displayEventEnd: true,
        displayEventTime: true,
        eventDurationEditable: true,
        eventStartEditable: true,
      };
    });
  }

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
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');

    // this.eventsService.getEvents();

  }
}
