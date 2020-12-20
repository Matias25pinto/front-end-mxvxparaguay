import { Component, Input, OnInit } from '@angular/core';
import { MxvxDbService } from 'src/app/services/mxvx-db.service';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';

@Component({
  selector: 'app-tarjeta-lista-paciente',
  templateUrl: './tarjeta-lista-paciente.component.html',
  styleUrls: ['./tarjeta-lista-paciente.component.css'],
})
export class TarjetaListaPacienteComponent implements OnInit {
  @Input() categoria: string;
  @Input() modalidad: string;
  public participantes: any[] = [];
  constructor(private http: MxvxDbService) {}

  ngOnInit(): void {
    this.cargarDatosBD();
  }
  cargarDatosBD() {
    //Todas las categorias
    if (this.modalidad == '') {
      this.http.getParticipantes('', '').subscribe((data) => {
        this.participantes = data['participantes'];
        this.generarFilas(
          this.participantes,
          'Todas las Categorías',
          'MXVX Paraguay'
        );
      });
    }
    //Datos de Motocross
    if (this.categoria == 'motocross') {
      if (this.modalidad == 'MX_1') {
        this.http.getParticipantes('motocross', 'MX_1').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'motocross', 'MX_1');
        });
      }
      if (this.modalidad == 'MX_2') {
        this.http.getParticipantes('motocross', 'MX_2').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'motocross', 'MX_2');
        });
      }
      if (this.modalidad == 'MX_JUNIOR') {
        this.http
          .getParticipantes('motocross', 'MX_JUNIOR')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'motocross', 'MX_JUNIOR');
          });
      }
      if (this.modalidad == 'MX_3') {
        this.http.getParticipantes('motocross', 'MX_3').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'motocross', 'MX_3');
        });
      }
      if (this.modalidad == 'MX_NOVICIOS') {
        this.http
          .getParticipantes('motocross', 'MX_NOVICIOS')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'motocross', 'MX_NOVICIOS');
          });
      }
      if (this.modalidad == 'MX_4') {
        this.http.getParticipantes('motocross', 'MX_4').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'motocross', 'MX_4');
        });
      }
      if (this.modalidad == 'MX_INTERMEDIA') {
        this.http
          .getParticipantes('motocross', 'MX_INTERMEDIA')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'motocross', 'MX_INTERMEDIA');
          });
      }
      if (this.modalidad == 'MX_5') {
        this.http.getParticipantes('motocross', 'MX_5').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'motocross', 'MX_5');
        });
      }
      if (this.modalidad == 'MINICROSS') {
        this.http
          .getParticipantes('motocross', 'MINICROSS')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'motocross', 'MINICROSS');
          });
      }
      if (this.modalidad == 'MAMADERA') {
        this.http
          .getParticipantes('motocross', 'MAMADERA')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'motocross', 'MAMADERA');
          });
      }
    }
    //Datos de Velocross
    if (this.categoria == 'velocross') {
      if (this.modalidad == 'VX_NOVICIOS_NAC') {
        this.http
          .getParticipantes('velocross', 'VX_NOVICIOS_NAC')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(
              this.participantes,
              'velocross',
              'VX_NOVICIOS_NAC'
            );
          });
      }
      if (this.modalidad == 'VX_SPORT') {
        this.http
          .getParticipantes('velocross', 'VX_SPORT')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'velocross', 'VX_SPORT');
          });
      }
      if (this.modalidad == 'VX_DAMAS') {
        this.http
          .getParticipantes('velocross', 'VX_DAMAS')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'velocross', 'VX_DAMAS');
          });
      }
      if (this.modalidad == 'VX_INTERMEDIA_NAC') {
        this.http
          .getParticipantes('velocross', 'VX_INTERMEDIA_NAC')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(
              this.participantes,
              'velocross',
              'VX_INTERMEDIA_NAC'
            );
          });
      }
      if (this.modalidad == 'VX_1') {
        this.http.getParticipantes('velocross', 'VX_1').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'velocross', 'VX_1');
        });
      }
      if (this.modalidad == 'VX_3') {
        this.http.getParticipantes('velocross', 'VX_3').subscribe((data) => {
          this.participantes = data['participantes'];
          this.generarFilas(this.participantes, 'velocross', 'VX_3');
        });
      }
      if (this.modalidad == 'VX_EXPERTO_NAC_200CC') {
        this.http
          .getParticipantes('velocross', 'VX_EXPERTO_NAC_200CC')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(
              this.participantes,
              'velocross',
              'VX_EXPERTO_NAC_200CC'
            );
          });
      }
      if (this.modalidad == 'VX_OPEN_35FL') {
        this.http
          .getParticipantes('velocross', 'VX_OPEN_35FL')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'velocross', 'VX_OPEN_35FL');
          });
      }
      if (this.modalidad == 'CAT_110K') {
        this.http
          .getParticipantes('velocross', 'CAT_110K')
          .subscribe((data) => {
            this.participantes = data['participantes'];
            this.generarFilas(this.participantes, 'velocross', 'CAT_110K');
          });
      }
    }
  }
  generarFilas(participantes: any, categoria: string, modalidad: string) {
    let datos = [];
    let cont = 1;
    let titleId = new Txt('#').bold().end;
    let titleNombre = new Txt('Nombre').bold().end;
    let titleApellido = new Txt('Apellido').bold().end;
    let titleCedula = new Txt('Cédula').bold().end;
    let titleCelular = new Txt('Celular').bold().end;
    let titleEstado = new Txt('Estado').bold().end;
    datos.push([
      titleId,
      titleNombre,
      titleApellido,
      titleCedula,
      titleCelular,
      titleEstado,
    ]);
    for (const participante of participantes) {
      let dat = [];
      dat.push(cont);
      dat.push(participante.nombre);
      dat.push(participante.apellido);
      dat.push(participante.cedula);
      dat.push('0' + participante.celular);
      if (participante.confirmado == 'true') {
        dat.push('Confirmado');
      } else {
        dat.push('Pendiente');
      }
      datos.push(dat);
      cont++;
    }
    const pdf = new PdfMakeWrapper();

    //Generar estilos al pdf
    pdf.defaultStyle({
      bold: false,
      fontSize: 16,
    });
    //Tamaño de hoja
    pdf.pageSize('A4');
    //Generar margenes
    pdf.pageMargins([40, 80, 40, 60]); //left, top, right, button
    //Horientacion del documento
    pdf.pageOrientation('portrait'); // 'portrait'
    //Generar el Encabezado
    let encabezado = new Txt(`${categoria} - ${modalidad}`)
      .bold()
      .decorationStyle('dotted')
      .fontSize(20)
      .alignment('center').end;
    pdf.header(encabezado);
    //Crear la tabla
    let tabla = new Table(datos)
      .alignment('center')
      .layout('lightHorizontalLines').end;

    //Cargar la tabla al pdf
    pdf.add(tabla);
    // ============= Simple watermark ============= la marca de agua
    //pdf.watermark('MXVX Paraguay 2020');

    //Generar el footer
    let fecha = new Date();
    let year = fecha.getFullYear();
    let footer = new Txt(
      `MXVX Paraguay ${year} \n www.campeonatomxvxparaguay.com`
    )
      .bold()
      .alignment('center').end;
    pdf.footer(footer);
    //Crear e imprimir pdf
    pdf.create().download(`${categoria} - ${modalidad}`);
  }
}
