import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-property-create-edit',
  templateUrl: './property-create-edit.component.html',
  styleUrls: ['./property-create-edit.component.css']
})
export class PropertyCreateEditComponent implements OnInit {
  newPropertyForm: FormGroup;
  inputs = [];

  constructor() { }

  ngOnInit() {
    this.newPropertyForm = new FormGroup({
      name: new FormControl(),
      address: new FormControl()
    });
    this.inputs = ['name'];

  }

  onSubmit() {

  }
}
