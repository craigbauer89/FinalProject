import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterChampionshipComponent } from './form-register-championship.component';

describe('FormRegisterChampionshipComponent', () => {
  let component: FormRegisterChampionshipComponent;
  let fixture: ComponentFixture<FormRegisterChampionshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegisterChampionshipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegisterChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
