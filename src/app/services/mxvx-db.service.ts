import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { registroParticipante } from '../models/registroParticipante';
@Injectable({
  providedIn: 'root',
})
export class MxvxDbService {
  //public url = 'http://localhost:3000'; //Trabajar en local
  public url = 'https://api-sedacosmetico.herokuapp.com'; //trabajar en el servidor
  constructor(private http: HttpClient) {}

  getParticipantes(categoria?: string, modalidad?: string) {
    // con headers indicamos como vamos a enviar la información
    if (categoria != '' && modalidad != '') {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(
        this.url +
          `/participantes?categoria=${categoria}&modalidad=${modalidad}`,
        { headers }
      );
    } else {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');
      return this.http.get(this.url + '/participantes', { headers });
    }
  }
  getParticipante(cedula) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + `/participante?cedula=${cedula}`, {
      headers,
    });
  }
  getCantidad(categoria: string, modalidad: string) {
    // con headers indicamos como vamos a enviar la información
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(
      this.url +
        `/participantes/cantidades?categoria=${categoria}&modalidad=${modalidad}`,
      { headers }
    );
  }
  setParticipante(participante) {
    // con headers indicamos como vamos a enviar la información
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/participante`, participante, {
      headers,
    });
  }
  deleteParticipante(id) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/participante/${id}`, {
      headers,
    });
  }
  cambiarEstado(id, estado) {
    let participante;
    if (estado) {
      participante = { confirmado: true };
    } else {
      participante = { confirmado: false };
    }

    // con headers indicamos como vamos a enviar la información
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/participante/${id}`, participante, {
      headers,
    });
  }
}
