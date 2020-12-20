import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  docChanges,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { registroParticipante } from '../models/registroParticipante';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, subscribeOn } from 'rxjs/operators';
import { exit } from 'process';

@Injectable({
  providedIn: 'root',
})
export class DataDbService {
  private contactCollection: AngularFirestoreCollection<registroParticipante>;
  public urlFB = 'https://mxvxparaguay-default-rtdb.firebaseio.com';
  public todos: any[];
  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.contactCollection = afs.collection<registroParticipante>(
      'participantes'
    );
  }

  saveRegistro(newParticipante: registroParticipante) {
    // guardar con Cloud Firestore
    this.contactCollection.add(newParticipante); // se agrega a la BD
    // con headers indicamos como vamos a enviar la información
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //guardar en Realtime Database
    //return this.http.post(`${this.urlFB}Participantes.json`, newParticipante);
  }

  async getRegistros(cedula: number) {
    let query = this.afs.collection<registroParticipante>(
      'participantes',
      (ref) => ref.where('cedula', '==', cedula)
    );
    let res: number;
    await query.get().subscribe((resp) => {
      resp.forEach(async (doc) => {
        res = await doc.data().cedula;
        return res;
      });
    });
  }
  getParticipantes(categoria: string): number {
    let cont = 0;
    console.log(this.todos);
    return cont;
  }
}
