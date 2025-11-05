import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterChannelComponent } from './form-register-channel.component';

describe('FormRegisterChannelComponent', () => {
  let component: FormRegisterChannelComponent;
  let fixture: ComponentFixture<FormRegisterChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
