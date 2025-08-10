import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterClassificaComponent } from './form-register-classifica.component';

describe('FormRegisterClassificaComponent', () => {
  let component: FormRegisterClassificaComponent;
  let fixture: ComponentFixture<FormRegisterClassificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterClassificaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterClassificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
