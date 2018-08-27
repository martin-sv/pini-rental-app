import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsFutureComponent } from './guests-future.component';

describe('GuestsFutureComponent', () => {
  let component: GuestsFutureComponent;
  let fixture: ComponentFixture<GuestsFutureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsFutureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsFutureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
