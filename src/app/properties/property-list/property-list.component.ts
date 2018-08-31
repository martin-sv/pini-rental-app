import { Component, OnInit, Output } from '@angular/core';
import { DataMock } from '../../shared/dataMock';
import { Property } from '../../shared/property.model';
import { Host } from '../../shared/host.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  @Output() host: Host = DataMock.host;
  @Output() properties = DataMock.properties;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }

  onPropertyClick(id: number) {
    // console.log('idProperty: ' + id);
    this.router.navigate(['./', id], {relativeTo: this.route});
  }
}
