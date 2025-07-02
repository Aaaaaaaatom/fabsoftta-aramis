import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TarefaComponent } from './tarefa/tarefa';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tarefas', component: TarefaComponent },
  { path: '**', redirectTo: '/login' }
];
