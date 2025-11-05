import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterNewsComponent } from './form-register-news.component';

describe('FormRegisterNewsComponent', () => {
  let component: FormRegisterNewsComponent;
  let fixture: ComponentFixture<FormRegisterNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
