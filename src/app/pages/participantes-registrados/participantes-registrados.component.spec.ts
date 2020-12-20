import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantesRegistradosComponent } from './participantes-registrados.component';

describe('ParticipantesRegistradosComponent', () => {
  let component: ParticipantesRegistradosComponent;
  let fixture: ComponentFixture<ParticipantesRegistradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantesRegistradosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantesRegistradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
