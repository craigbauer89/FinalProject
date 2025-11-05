import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterPlayerComponent } from './form-register-player.component';

describe('FormRegisterPlayerComponent', () => {
  let component: FormRegisterPlayerComponent;
  let fixture: ComponentFixture<FormRegisterPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
