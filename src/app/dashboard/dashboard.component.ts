import { Component, OnInit } from '@angular/core';
import { EventsSesrvice } from './events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: {resourceId: string, title: string, start: string, end?: string}[];
  resources: {id: string, title: string}[];

  constructor (private eventsService: EventsSesrvice) {}

  ngOnInit() {
    this.eventsService.onDataUpdate.subscribe(data => {
      this.resources = [];
      for (let i = 0; i < data[1].length; i++) {
        this.resources.push({id: data[1][i], title: data[1][i]});
      }
      this.data = data[0];
    });
  }
}
