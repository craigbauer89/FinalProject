import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingDetails2Component } from './standing-details2.component';

describe('StandingDetails2Component', () => {
  let component: StandingDetails2Component;
  let fixture: ComponentFixture<StandingDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
