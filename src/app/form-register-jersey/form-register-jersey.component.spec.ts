import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterJerseyComponent } from './form-register-jersey.component';

describe('FormRegisterJerseyComponent', () => {
  let component: FormRegisterJerseyComponent;
  let fixture: ComponentFixture<FormRegisterJerseyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterJerseyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterJerseyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
