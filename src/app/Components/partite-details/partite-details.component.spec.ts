import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiteDetailsComponent } from './partite-details.component';

describe('PartiteDetailsComponent', () => {
  let component: PartiteDetailsComponent;
  let fixture: ComponentFixture<PartiteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartiteDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
