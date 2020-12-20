import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxvxDbService } from 'src/app/services/mxvx-db.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tarjeta-participantes',
  templateUrl: './tarjeta-participantes.component.html',
  styleUrls: ['./tarjeta-participantes.component.css'],
})
export class TarjetaParticipantesComponent implements OnInit {
  @Input() categoria: string;
  @Input() modalidad: string;
  public participantes: any[] = [];

  constructor(private http: MxvxDbService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDatosBD();
  }
  cargarDatosBD() {
    this.http
      .getParticipantes(this.categoria, this.modalidad)
      .subscribe((data) => {
        this.participantes = data['participantes'];
      });
  }
  borrarParticipante(participante: any) {
    Swal.fire({
      title: 'Eliminar Participante!!',
      text: 'Esta seguro de Eliminar al Participante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar participante!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El participante fue eliminado exitosamente.',
          'success'
        );
        let id = participante['_id'];
        this.http.deleteParticipante(id).subscribe((data) => {
          this.cargarDatosBD();
          this.router.navigate(['/participantes']);
        });
      }
    });
  }
}
