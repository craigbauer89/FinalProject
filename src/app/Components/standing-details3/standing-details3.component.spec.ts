import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingDetails3Component } from './standing-details3.component';

describe('StandingDetails3Component', () => {
  let component: StandingDetails3Component;
  let fixture: ComponentFixture<StandingDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingDetails3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
