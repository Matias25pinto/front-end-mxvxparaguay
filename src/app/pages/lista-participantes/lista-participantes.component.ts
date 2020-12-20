import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MxvxDbService } from 'src/app/services/mxvx-db.service';

@Component({
  selector: 'app-lista-participantes',
  templateUrl: './lista-participantes.component.html',
  styleUrls: ['./lista-participantes.component.css'],
})
export class ListaParticipantesComponent implements OnInit {
  public categoria: string;
  public modalidad: string;
  public participantes: any;
  constructor(private route: ActivatedRoute, private http: MxvxDbService) {
    this.route.params.subscribe((parametros) => {
      this.categoria = parametros['categoria'];
      this.modalidad = parametros['modalidad'];
    });
  }

  ngOnInit(): void {
    this.http
      .getParticipantes(this.categoria, this.modalidad)
      .subscribe((data) => {
        this.participantes = data;
      });
  }
}
