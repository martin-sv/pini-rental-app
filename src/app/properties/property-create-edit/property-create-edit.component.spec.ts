import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCreateEditComponent } from './property-create-edit.component';

describe('PropertyCreateEditComponent', () => {
  let component: PropertyCreateEditComponent;
  let fixture: ComponentFixture<PropertyCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
