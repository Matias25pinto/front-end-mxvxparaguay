import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MxvxDbService } from 'src/app/services/mxvx-db.service';
import { registroParticipante } from 'src/app/models/registroParticipante';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css'],
})
export class ParticipanteComponent implements OnInit {
  public participante: registroParticipante[] = [];
  public motocross: any[] = [];
  public velocross: any[] = [];
  public acomp1: any;
  public acomp2: any;
  public acomp3: any[] = [];
  public aporte: any;

  constructor(
    private http: MxvxDbService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarParticiapnte();
  }
  cargarParticiapnte() {
    let cedula;
    this.route.params.subscribe((parametros) => {
      cedula = parametros.cedula;
    });
    this.http.getParticipante(cedula).subscribe((data) => {
      this.participante = data['participante'][0];
      let motocross = data['participante'][0]['motocross'][0];
      let velocross = data['participante'][0]['velocross'][0];

      this.aporte = data['participante'][0]['aporte'][0];
      this.acomp1 = data['participante'][0]['Companion1'][0];
      this.acomp2 = data['participante'][0]['Companion2'][0];
      this.acomp3 = data['participante'][0]['Companion3'][0];
      // for in de motocros
      for (const key in motocross) {
        if (Object.prototype.hasOwnProperty.call(motocross, key)) {
          const element = motocross[key];
          if (element && key != '_id') {
            this.motocross.push(key);
          }
        }
      }
      // for in de velocross
      for (const key in velocross) {
        if (Object.prototype.hasOwnProperty.call(velocross, key)) {
          const element = velocross[key];
          if (element && key != '_id') {
            this.velocross.push(key);
          }
        }
      }
    });
  }
  // Redirigir a whatsapp
  irWhatsapp(): void {
    // abrir la app de what con un mensaje
    let celular = this.participante['celular'];
    window.open(`https://wa.me/+595${celular}`, '_blank');
  }
  cambiarEstado(estado: Boolean) {
    this.http
      .cambiarEstado(this.participante['_id'], estado)
      .subscribe((data) => {
        this.cargarParticiapnte();
        this.router.navigate([`/participante/${this.participante['cedula']}`]);
      });
  }
}
