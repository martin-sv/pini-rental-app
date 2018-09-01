import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Property } from '../../shared/property.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private router: Router,
              private propertiesService: PropertiesService) {
  }

  ngOnInit() {
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
}
