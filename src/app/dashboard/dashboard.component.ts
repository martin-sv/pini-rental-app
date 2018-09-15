import { Component, OnInit } from '@angular/core';
import { EventsSesrvice } from './events.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: {resourceId: string, title: string, start: string, end?: string}[];
  resources: {id: string, title: string}[];

  constructor (private eventsService: EventsSesrvice) {
  }

  ngOnInit() {
    this.eventsService.onDataUpdate.pipe(take(1)).subscribe(data => {
      this.data = data;
    });

    this.eventsService.onPropertiesUpdate.pipe(take(1)).subscribe(resources => {
      this.resources = resources;
    });
  }
}
