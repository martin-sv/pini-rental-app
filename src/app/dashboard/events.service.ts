import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { PropertiesService } from '../properties/properties.service';
import { CheckInFull } from '../shared/models/checkinFull.model';
import { Property } from '../shared/models/property.model';
import { Host } from '../shared/models/host.model';
import { AuthDataStatic } from '../auth/auth-data.static';

@Injectable()
export class EventsSesrvice {
  private allData: {resourceId: string, title: string, start: string, end?: string}[] = [];
  private allResources: {id: string, title: string, children?: {id: string, title: string}[]}[];
  private myData: {resourceId: string, title: string, start: string, end?: string}[] = [];
  private myResources: {id: string, title: string, children?: {id: string, title: string}[]}[];
  onAllDataUpdate = new ReplaySubject<any>(1);
  onAllPropertiesUpdate = new ReplaySubject<any>(1);
  onMyDataUpdate = new ReplaySubject<any>(1);
  onMyPropertiesUpdate = new ReplaySubject<any>(1);

  constructor(private propertiesService: PropertiesService) {
    this.propertiesService.allCheckinsUpdate.subscribe((checkins: CheckInFull[]) => {
      this.allData = [];
      this.myData = [];
      checkins.forEach(checkin => {
        // console.log(checkin.guest.fullName + ' - ' + checkin.checkingDateTime + ' - ' + checkin.checkoutDateTime);
        const start = new Date(checkin.checkingDateTime);
        const end = new Date(checkin.checkoutDateTime);
        this.allData.push({
          resourceId: checkin.property.idProperty,
          title: checkin.host.firstName + ': ' + checkin.guest.fullName,
          start: start.toISOString(),
          end: end.toISOString()
        });
        if (checkin.idHost === AuthDataStatic.authData.email) {
          this.myData.push({
            resourceId: checkin.property.idProperty,
            title: checkin.host.firstName + ': ' + checkin.guest.fullName,
            start: start.toISOString(),
            end: end.toISOString()
          });
        }

      });
      this.onAllDataUpdate.next(this.allData);
      this.onMyDataUpdate.next(this.myData);
      // this.onDataUpdate.next(this.fullData());

    });

    // this.propertiesService.myPropertiesUpdate.subscribe((properties: Property[]) => { this.buildResources(properties); });
    this.propertiesService.allPropertiesUpdate.subscribe((properties: Property[]) => { this.buildResources(properties); });
  }

  private async buildResources(properties: Property[]) {
    this.allResources = [];
    this.myResources = [];
    // Get Hosts with properties
    const hostsWithProperties: {id: string, title: string}[] = [];
    for (let i = 0; i < properties.length; i++) {
      if (!hostsWithProperties.find(value => value.id === properties[i].idHost)) {
        const host: Host = await this.propertiesService.getHostByID(properties[i].idHost);
        hostsWithProperties.push({id: properties[i].idHost, title: host.firstName + ' ' + host.lastName});
      }
    }
    // console.log('Hosts With Properties: ' + hostsWithProperties.length);
    for (let i = 0; i < hostsWithProperties.length; i++) {
      const hostProperties: Property[] = await this.propertiesService.getHostProperties(hostsWithProperties[i].id);
      const children:  {id: string, title: string}[] = [];
      for (let j = 0; j < hostProperties.length; j++) {
        children.push({id: hostProperties[j].idProperty, title: hostProperties[j].name});
        if (hostProperties[j].idHost === AuthDataStatic.authData.email) {
          this.myResources.push({id: hostProperties[j].idProperty, title: hostProperties[j].name});
        }
      }
      this.allResources.push({id: hostsWithProperties[i].id, title: hostsWithProperties[i].title, children: children});
    }
    this.onAllPropertiesUpdate.next(this.allResources);
    this.onMyPropertiesUpdate.next(this.myResources);
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
