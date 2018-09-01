import { Component, OnInit, Host, OnDestroy } from '@angular/core';
import { Property } from '../../shared/property.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  private host: Host;
  private properties: Property[];
  private hostUpdateSub: Subscription;
  private propertiesUpdateSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertiesService: PropertiesService) {
  }

  ngOnInit() {
    // Initial Setup + Listeners
    this.host = this.propertiesService.host;
    this.properties = this.propertiesService.properties;
    this.hostUpdateSub = this.propertiesService.hostUpdate.subscribe(host => {
      this.host = host;
    });
    this.propertiesUpdateSub = this.propertiesService.propertiesUpdate.subscribe (properties => {
      this.properties = properties;
    });
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onAddPropertyClick() {
    // console.log(this.host);
    this.propertiesService.addMyProperty();
  }

  onAddGuestClick() {
    // TODO: Implement
  }

  onPropertyClick(idProperty: number) {
    // console.log('idProperty: ' + id);
    this.router.navigate(['./', idProperty], {relativeTo: this.route});
  }

  onPropertyCardClick(idProperty: string) {
    this.propertiesService.removeMyProperty(idProperty);
  }

  ngOnDestroy() {
    if (this.hostUpdateSub) { this.hostUpdateSub.unsubscribe(); }
    if (this.propertiesUpdateSub) { this.propertiesUpdateSub.unsubscribe(); }
  }
}
