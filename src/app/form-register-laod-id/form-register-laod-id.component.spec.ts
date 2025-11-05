import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterLaodIdComponent } from './form-register-laod-id.component';

describe('FormRegisterLaodIdComponent', () => {
  let component: FormRegisterLaodIdComponent;
  let fixture: ComponentFixture<FormRegisterLaodIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterLaodIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterLaodIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
