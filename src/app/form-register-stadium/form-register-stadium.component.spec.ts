import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterStadiumComponent } from './form-register-stadium.component';

describe('FormRegisterStadiumComponent', () => {
  let component: FormRegisterStadiumComponent;
  let fixture: ComponentFixture<FormRegisterStadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterStadiumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
