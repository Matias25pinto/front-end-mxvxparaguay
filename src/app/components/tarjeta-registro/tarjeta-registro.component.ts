import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { DataDbService } from 'src/app/services/data-db.service';
import { MxvxDbService } from 'src/app/services/mxvx-db.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarjeta-registro',
  templateUrl: './tarjeta-registro.component.html',
  styleUrls: ['./tarjeta-registro.component.css'],
})
export class TarjetaRegistroComponent implements OnInit {
  forma: FormGroup;
  //categorias motocross
  cupoMX_1: number;
  cupoMX_2: number;
  cupoMX_JUNIOR: number;
  cupoMX_3: number;
  cupoMX_NOVICIOS: number;
  cupoMX_4: number;
  cupoMX_INTERMEDIA: number;
  cupoMX_5: number;
  cupoMINICROSS: number;
  cupoMAMADERA: number;

  //categorias velocross
  cupoVX_NOVICIOS_NAC: number;
  cupoVX_SPORT: number;
  cupoVX_DAMAS: number;
  cupoVX_INTERMEDIA_NAC: number;
  cupoVX_1: number;
  cupoVX_3: number;
  cupoVX_EXPERTO_NAC_200CC: number;
  cupoVX_OPEN_35FL: number;
  cupoCAT_110K: number;
  //variables varias
  public contCom: number = 0;
  public cedulas: any[] = [];
  public mostrarPago: Boolean;
  public mostrarGuardar: Boolean;
  public motocross: String[] = [
    'MX_1',
    'MX_2',
    'MX_JUNIOR',
    'MX_3',
    'MX_NOVICIOS',
    'MX_4',
    'MX_INTERMEDIA',
    'MX_5',
    'MINICROSS',
    'MAMADERA',
  ];
  public velocross: String[] = [
    'VX_NOVICIOS_NAC',
    'VX_SPORT',
    'VX_DAMAS',
    'VX_INTERMEDIA_NAC',
    'VX_1',
    'VX_3',
    'VX_EXPERTO_NAC_200CC',
    'VX_OPEN_35FL',
    'CAT_110K',
  ];
  constructor(
    private fb: FormBuilder,
    private registroService: DataDbService,
    private mxvxService: MxvxDbService,
    private validadores: ValidadoresService,
    private router: Router
  ) {
    this.mxvxService.getParticipantes().subscribe((data) => {
      this.cedulas = data['participantes'];
    });
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.verificarCupo();
  }
  verificarCupo(): void {
    //MOTOCROOS
    this.mxvxService.getCantidad('motocross', 'MX_1').subscribe((data) => {
      this.cupoMX_1 = data['cantidad'];
    });
    this.mxvxService.getCantidad('motocross', 'MX_2').subscribe((data) => {
      this.cupoMX_2 = data['cantidad'];
    });
    this.mxvxService.getCantidad('motocross', 'MX_JUNIOR').subscribe((data) => {
      this.cupoMX_JUNIOR = data['cantidad'];
    });
    this.mxvxService.getCantidad('motocross', 'MX_3').subscribe((data) => {
      this.cupoMX_3 = data['cantidad'];
    });
    this.mxvxService
      .getCantidad('motocross', 'MX_NOVICIOS')
      .subscribe((data) => {
        this.cupoMX_NOVICIOS = data['cantidad'];
      });
    this.mxvxService.getCantidad('motocross', 'MX_4').subscribe((data) => {
      this.cupoMX_4 = data['cantidad'];
    });
    this.mxvxService
      .getCantidad('motocross', 'MX_INTERMEDIA')
      .subscribe((data) => {
        this.cupoMX_INTERMEDIA = data['cantidad'];
      });
    this.mxvxService.getCantidad('motocross', 'MX_5').subscribe((data) => {
      this.cupoMX_5 = data['cantidad'];
    });
    this.mxvxService.getCantidad('motocross', 'MINICROSS').subscribe((data) => {
      this.cupoMINICROSS = data['cantidad'];
    });
    this.mxvxService.getCantidad('motocross', 'MAMADERA').subscribe((data) => {
      this.cupoMAMADERA = data['cantidad'];
    });

    //VELOCROSS
    this.mxvxService
      .getCantidad('velocross', 'VX_NOVICIOS_NAC')
      .subscribe((data) => {
        this.cupoVX_NOVICIOS_NAC = data['cantidad'];
      });
    this.mxvxService.getCantidad('velocross', 'VX_SPORT').subscribe((data) => {
      this.cupoVX_SPORT = data['cantidad'];
    });
    this.mxvxService.getCantidad('velocross', 'VX_DAMAS').subscribe((data) => {
      this.cupoVX_DAMAS = data['cantidad'];
    });
    this.mxvxService
      .getCantidad('velocross', 'VX_INTERMEDIA_NAC')
      .subscribe((data) => {
        this.cupoVX_INTERMEDIA_NAC = data['cantidad'];
      });
    this.mxvxService.getCantidad('velocross', 'VX_1').subscribe((data) => {
      this.cupoVX_1 = data['cantidad'];
    });
    this.mxvxService.getCantidad('velocross', 'VX_3').subscribe((data) => {
      this.cupoVX_3 = data['cantidad'];
    });
    this.mxvxService
      .getCantidad('velocross', 'VX_EXPERTO_NAC_200CC')
      .subscribe((data) => {
        this.cupoVX_EXPERTO_NAC_200CC = data['cantidad'];
      });
    this.mxvxService
      .getCantidad('velocross', 'VX_OPEN_35FL')
      .subscribe((data) => {
        this.cupoVX_OPEN_35FL = data['cantidad'];
      });
    this.mxvxService.getCantidad('velocross', 'CAT_110K').subscribe((data) => {
      this.cupoCAT_110K = data['cantidad'];
    });
  }

  //Comprobante de pago
  get comprobanteNovalido() {
    return (
      this.forma.get('aporte.comprobante').invalid &&
      this.forma.get('aporte.comprobante').touched
    );
  }
  get formaPagoNovalido() {
    return (
      this.forma.get('aporte.formaPago').invalid &&
      this.forma.get('aporte.formaPago').touched
    );
  }
  get fechaNovalido() {
    return (
      this.forma.get('aporte.fecha').invalid &&
      this.forma.get('aporte.fecha').touched
    );
  }
  get montoNovalido() {
    return (
      this.forma.get('aporte.monto').invalid &&
      this.forma.get('aporte.monto').touched
    );
  }
  // Participante
  get nombreNovalido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNovalido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  get cedulaNovalido() {
    return this.forma.get('cedula').invalid && this.forma.get('cedula').touched;
  }

  get correoNovalido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get ciudadNovalido() {
    return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched;
  }

  get celularNovalido() {
    return (
      this.forma.get('celular').invalid && this.forma.get('celular').touched
    );
  }
  //Acompañante 1
  get nombre1Novalido() {
    return (
      this.forma.get('Companion1.nombre').invalid &&
      this.forma.get('Companion1.nombre').touched
    );
  }

  get apellido1Novalido() {
    return (
      this.forma.get('Companion1.apellido').invalid &&
      this.forma.get('Companion1.apellido').touched
    );
  }

  get cedula1Novalido() {
    return (
      this.forma.get('Companion1.cedula').invalid &&
      this.forma.get('Companion1.cedula').touched
    );
  }

  get celular1Novalido() {
    return (
      this.forma.get('Companion1.celular').invalid &&
      this.forma.get('Companion1.celular').touched
    );
  }

  //Acompañante 2
  get nombre2Novalido() {
    return (
      this.forma.get('Companion2.nombre').invalid &&
      this.forma.get('Companion2.nombre').touched
    );
  }

  get apellido2Novalido() {
    return (
      this.forma.get('Companion2.apellido').invalid &&
      this.forma.get('Companion2.apellido').touched
    );
  }

  get cedula2Novalido() {
    return (
      this.forma.get('Companion2.cedula').invalid &&
      this.forma.get('Companion2.cedula').touched
    );
  }

  get celular2Novalido() {
    return (
      this.forma.get('Companion2.celular').invalid &&
      this.forma.get('Companion2.celular').touched
    );
  }

  //Acompañante 3
  get nombre3Novalido() {
    return (
      this.forma.get('Companion3.nombre').invalid &&
      this.forma.get('Companion3.nombre').touched
    );
  }

  get apellido3Novalido() {
    return (
      this.forma.get('Companion3.apellido').invalid &&
      this.forma.get('Companion3.apellido').touched
    );
  }

  get cedula3Novalido() {
    return (
      this.forma.get('Companion3.cedula').invalid &&
      this.forma.get('Companion3.cedula').touched
    );
  }

  get celular3Novalido() {
    return (
      this.forma.get('Companion3.celular').invalid &&
      this.forma.get('Companion3.celular').touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      aporte: this.fb.group({
        comprobante: [''],
        formaPago: [''],
        fecha: [''],
        monto: ['', [Validators.pattern('[0-9]{5,6}')]],
      }),
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{6,7}')]],
      celular: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      correo: [
        '',
        [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')],
      ],
      ciudad: ['', [Validators.required, Validators.minLength(3)]],
      confirmado: [false, Validators.required],
      motocross: this.fb.group({
        MX_1: [false],
        MX_2: [false],
        MX_JUNIOR: [false],
        MX_3: [false],
        MX_NOVICIOS: [false],
        MX_4: [false],
        MX_INTERMEDIA: [false],
        MX_5: [false],
        MINICROSS: [false],
        MAMADERA: [false],
      }),
      velocross: this.fb.group({
        VX_NOVICIOS_NAC: [false],
        VX_SPORT: [false],
        VX_DAMAS: [false],
        VX_INTERMEDIA_NAC: [false],
        VX_1: [false],
        VX_3: [false],
        VX_EXPERTO_NAC_200CC: [false],
        VX_OPEN_35FL: [false],
        CAT_110K: [false],
      }),
      Companion1: this.fb.group({
        nombre: ['', Validators.minLength(3)],
        apellido: ['', Validators.minLength(3)],
        cedula: ['', Validators.pattern('[0-9]{6,7}')],
        celular: ['', Validators.pattern('[0-9]{9}')],
      }),
      Companion2: this.fb.group({
        nombre: ['', Validators.minLength(3)],
        apellido: ['', Validators.minLength(3)],
        cedula: ['', Validators.pattern('[0-9]{6,7}')],
        celular: ['', Validators.pattern('[0-9]{9}')],
      }),
      Companion3: this.fb.group({
        nombre: ['', Validators.minLength(3)],
        apellido: ['', Validators.minLength(3)],
        cedula: ['', Validators.pattern('[0-9]{6,7}')],
        celular: ['', Validators.pattern('[0-9]{9}')],
      }),
    });
  }
  agregarCompanion(mas: Boolean) {
    if (mas) {
      this.contCom = this.contCom + 1;
    } else {
      this.contCom = this.contCom - 1;
    }
    if (this.contCom > 2) {
      this.contCom = 2;
    }
    if (this.contCom < 0) {
      this.contCom = 0;
    }
  }
  verificarPago() {
    this.mostrarPago = false;
    this.mostrarGuardar = false;

    for (const categoria of this.motocross) {
      if (this.forma.value.motocross[`${categoria}`] && categoria != 'MX_1') {
        this.mostrarPago = true;
        this.mostrarGuardar = true;
      } else {
        if (this.forma.value.motocross[`${categoria}`]) {
          this.mostrarGuardar = true;
        }
      }
    }
    for (const categoria of this.velocross) {
      if (this.forma.value.velocross[`${categoria}`] && categoria != 'MX_1') {
        this.mostrarPago = true;
        this.mostrarGuardar = true;
      } else {
        if (this.forma.value.velocross[`${categoria}`]) {
          this.mostrarGuardar = true;
        }
      }
    }
  }
  guardar() {
    //Para hacer que se dispare las validaciones si el formulario queda en blanco
    Object.values(this.forma.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((control) => {
          control.markAllAsTouched();
        });
      } else {
        control.markAsTouched();
      }
    });
    //Verificar si esta completado el formulario de pago
    let comprobatePago = true;
    if (this.mostrarPago) {
      let aporte = this.forma.controls.aporte.value;
      if (
        aporte.comprobante == '' ||
        aporte.fecha == '' ||
        aporte.formaPago == '' ||
        aporte.monto == ''
      ) {
        comprobatePago = false;
      }
    }
    //Verificar los cupos
    let cuposDisponibles = true;
    //Validar MX_1
    if (this.forma.controls.motocross.value.MX_1) {
      if (this.cupoMX_1 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_2
    if (this.forma.controls.motocross.value.MX_2) {
      if (this.cupoMX_2 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_JUNIOR
    if (this.forma.controls.motocross.value.MX_JUNIOR) {
      if (this.cupoMX_JUNIOR > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_3
    if (this.forma.controls.motocross.value.MX_3) {
      if (this.cupoMX_3 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_NOVICIOS
    if (this.forma.controls.motocross.value.MX_NOVICIOS) {
      if (this.cupoMX_NOVICIOS > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_4
    if (this.forma.controls.motocross.value.MX_4) {
      if (this.cupoMX_4 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_INTERMEDIA
    if (this.forma.controls.motocross.value.MX_INTERMEDIA) {
      if (this.cupoMX_INTERMEDIA > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MX_5
    if (this.forma.controls.motocross.value.MX_5) {
      if (this.cupoMX_5 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MINICROSS
    if (this.forma.controls.motocross.value.MINICROSS) {
      if (this.cupoMINICROSS > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar MAMADERA
    if (this.forma.controls.motocross.value.MAMADERA) {
      if (this.cupoMAMADERA > 17) {
        cuposDisponibles = false;
      }
    }

    //Validar Velocross
    //Validar VX_NOVICIOS_NAC
    if (this.forma.controls.velocross.value.VX_NOVICIOS_NAC) {
      if (this.cupoVX_NOVICIOS_NAC > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_SPORT
    if (this.forma.controls.velocross.value.VX_SPORT) {
      if (this.cupoVX_SPORT > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_DAMAS
    if (this.forma.controls.velocross.value.VX_DAMAS) {
      if (this.cupoVX_DAMAS > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_INTERMEDIA_NAC
    if (this.forma.controls.velocross.value.VX_INTERMEDIA_NAC) {
      if (this.cupoVX_INTERMEDIA_NAC > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_1
    if (this.forma.controls.velocross.value.VX_1) {
      if (this.cupoVX_1 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_3
    if (this.forma.controls.velocross.value.VX_3) {
      if (this.cupoVX_3 > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_EXPERTO_NAC_200CC
    if (this.forma.controls.velocross.value.VX_EXPERTO_NAC_200CC) {
      if (this.cupoVX_EXPERTO_NAC_200CC > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar VX_OPEN_35FL
    if (this.forma.controls.velocross.value.VX_OPEN_35FL) {
      if (this.cupoVX_OPEN_35FL > 17) {
        cuposDisponibles = false;
      }
    }
    //Validar CAT_110K
    if (this.forma.controls.velocross.value.CAT_110K) {
      if (this.cupoCAT_110K > 17) {
        cuposDisponibles = false;
      }
    }

    //Cargar en la BD si el formulario es valido
    if (this.forma.valid && cuposDisponibles && comprobatePago) {
      this.mxvxService.setParticipante(this.forma.value).subscribe(
        (data) => {
          // Entra aquí con respuesta del servicio correcta código http 200
          Swal.fire({
            allowOutsideClick: false,
            title: 'Exito!',
            text: 'Gracias por inscribirte a MX VX 2020',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.forma.reset({
            aporte: {
              comprobante: '',
              formaPago: '',
              fecha: '',
              monto: '',
            },
            confirmado: false,
            motocross: {
              MX_1: false,
              MX_2: false,
              MX_JUNIOR: false,
              MX_3: false,
              MX_NOVICIOS: false,
              MX_4: false,
              MX_INTERMEDIA: false,
              MX_5: false,
              MINICROSS: false,
              MAMADERA: false,
            },
            velocross: {
              VX_NOVICIOS_NAC: false,
              VX_SPORT: false,
              VX_DAMAS: false,
              VX_INTERMEDIA_NAC: false,
              VX_1: false,
              VX_3: false,
              VX_EXPERTO_NAC_200CC: false,
              VX_OPEN_35FL: false,
              CAT_110K: false,
            },
          }); // limpiar formulario
        },
        (err) => {
          // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error!',
            text:
              'Lo sentimos no se ha podido procesar la inscripción, verifique su número de cédula ya figura como competidor',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else if (!cuposDisponibles) {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text:
          'Lo sentimos no se ha podido procesar la inscripción, verifique la lista de participantes en las categorías seleccionadas y desmarque las categorías llenas',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else if (!comprobatePago) {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text:
          'Lo sentimos no se ha podido procesar la inscripción, verifique el contenido de su comprobante de pago',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 500
      Swal.fire({
        allowOutsideClick: false,
        title: 'Error!',
        text:
          'Lo sentimos no se ha podido procesar la inscripción, verifique los datos del competidor',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    this.verificarCupo();
    this.router.navigate(['/registro']);
  }
}
