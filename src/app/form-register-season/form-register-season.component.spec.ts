import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterSeasonComponent } from './form-register-season.component';

describe('FormRegisterSeasonComponent', () => {
  let component: FormRegisterSeasonComponent;
  let fixture: ComponentFixture<FormRegisterSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterSeasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
