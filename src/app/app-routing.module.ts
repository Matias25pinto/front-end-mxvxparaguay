import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaParticipantesComponent } from './pages/lista-participantes/lista-participantes.component';
import { ParticipanteComponent } from './pages/participante/participante.component';
import { ParticipantesRegistradosComponent } from './pages/participantes-registrados/participantes-registrados.component';
import { RegistroParticipanteComponent } from './pages/registro-participante/registro-participante.component';

const routes: Routes = [
  { path: 'registro', component: RegistroParticipanteComponent },
  { path: 'participantes', component: ParticipantesRegistradosComponent },
  { path: 'participante/:cedula', component: ParticipanteComponent },
  {
    path: 'participantes/lista/:categoria/:modalidad',
    component: ListaParticipantesComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'registro' },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
