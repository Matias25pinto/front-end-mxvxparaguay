import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaRegistroComponent } from './tarjeta-registro.component';

describe('TarjetaRegistroComponent', () => {
  let component: TarjetaRegistroComponent;
  let fixture: ComponentFixture<TarjetaRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
