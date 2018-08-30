import { Component, OnInit, Output } from '@angular/core';
import { DataMock } from '../../shared/DataMock';
import { Property } from '../../shared/Property';
import { Host } from '../../shared/Host';

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

  getPicture(property) {
    console.log('GetColor!!!!!!' + property.picture);
    return ('url("' + property.picture + '")');
  }
}
