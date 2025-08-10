import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiteDetails2Component } from './partite-details2.component';

describe('PartiteDetails2Component', () => {
  let component: PartiteDetails2Component;
  let fixture: ComponentFixture<PartiteDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiteDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiteDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
