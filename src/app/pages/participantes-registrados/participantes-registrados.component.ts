import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participantes-registrados',
  templateUrl: './participantes-registrados.component.html',
  styleUrls: ['./participantes-registrados.component.css'],
})
export class ParticipantesRegistradosComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}
