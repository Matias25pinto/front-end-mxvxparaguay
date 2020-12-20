import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Formulario Reactivo
import { ReactiveFormsModule } from '@angular/forms';
//Http
import { HttpClientModule } from '@angular/common/http';
//FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

//Sweet Alert 2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//Componentes
import { RegistroParticipanteComponent } from './pages/registro-participante/registro-participante.component';
import { TarjetaRegistroComponent } from './components/tarjeta-registro/tarjeta-registro.component';
import { ParticipantesRegistradosComponent } from './pages/participantes-registrados/participantes-registrados.component';
import { TarjetaParticipantesComponent } from './components/tarjeta-participantes/tarjeta-participantes.component';
import { ParticipanteComponent } from './pages/participante/participante.component';
import { ListaParticipantesComponent } from './pages/lista-participantes/lista-participantes.component';
import { TarjetaListaPacienteComponent } from './components/tarjeta-lista-paciente/tarjeta-lista-paciente.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
// De esta forma se importa en Angular la forma de la documentación no funciona en Angular 10
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    RegistroParticipanteComponent,
    TarjetaRegistroComponent,
    ParticipantesRegistradosComponent,
    TarjetaParticipantesComponent,
    ParticipanteComponent,
    ListaParticipantesComponent,
    TarjetaListaPacienteComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
