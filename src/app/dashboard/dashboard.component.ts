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
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: data
      };
    });
  }

  eventClick() {
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
