import { Component, OnInit, Output } from '@angular/core';
import { DataMock } from '../../shared/dataMock';
import { Property } from '../../shared/property';
import { Host } from '../../shared/host';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  @Output() host: Host = DataMock.host;
  @Output() properties = DataMock.properties;

  constructor() { }

  ngOnInit() {
  }

  getCover(property: Property) {
    return ('url("' + property.cover + '")');
  }
}
