import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsPastComponent } from './guests-past.component';

describe('GuestsPastComponent', () => {
  let component: GuestsPastComponent;
  let fixture: ComponentFixture<GuestsPastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsPastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
