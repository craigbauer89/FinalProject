import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiteDetails3Component } from './partite-details3.component';

describe('PartiteDetails3Component', () => {
  let component: PartiteDetails3Component;
  let fixture: ComponentFixture<PartiteDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiteDetails3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiteDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
