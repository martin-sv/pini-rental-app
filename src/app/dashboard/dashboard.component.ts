import { Component, OnInit } from '@angular/core';
import { EventsSesrvice } from './events.service';
import { take } from 'rxjs/operators';
import { UserRolesEnum } from '../auth/userRolesEnum';
import { AuthService } from '../auth/auth.service';
import { AuthDataStatic } from '../auth/auth-data.static';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: {resourceId: string, title: string, start: string, end?: string}[];
  resources: {id: string, title: string}[];

  constructor ( private eventsService: EventsSesrvice,
                private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.onUserRoleUpdate.subscribe((userRole: UserRolesEnum) => {
      if (AuthDataStatic.authData.role === UserRolesEnum.ADMIN) {
        this.eventsService.onAllDataUpdate.pipe(take(1)).subscribe(data => {
          this.data = data;
        });
        this.eventsService.onAllPropertiesUpdate.pipe(take(1)).subscribe(resources => {
          this.resources = resources;
        });
      } else {
        this.eventsService.onMyDataUpdate.pipe(take(1)).subscribe(data => {
          this.data = data;
        });
        this.eventsService.onMyPropertiesUpdate.pipe(take(1)).subscribe(resources => {
          this.resources = resources;
        });
      }
    });
  }
}
