import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaListaPacienteComponent } from './tarjeta-lista-paciente.component';

describe('TarjetaListaPacienteComponent', () => {
  let component: TarjetaListaPacienteComponent;
  let fixture: ComponentFixture<TarjetaListaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaListaPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaListaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
