import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  
  apiURL = "http://localhost:8080/api/tarefas";

  constructor(private http: HttpClient) {}

  getTarefas() {
    return this.http.get<Tarefa[]>(this.apiURL);
  }

  saveTarefa(tarefa: Tarefa) {
    if (tarefa.id) {
      return this.http.put(this.apiURL + '/' + tarefa.id, tarefa);
    }
    return this.http.post(this.apiURL, tarefa);
  }

  getTarefaById(id: any) {
    return this.http.get<Tarefa>(this.apiURL + '/' + id);
  }

  excluirTarefa(id: any) {
    return this.http.delete<Tarefa>(this.apiURL + '/' + id);
  }

  getTarefasByUsuario(usuarioId: number) {
    return this.http.get<Tarefa[]>(`${this.apiURL}/usuario/${usuarioId}`);
  }

  getTarefasNaoConcluidasByUsuario(usuarioId: number) {
    return this.http.get<Tarefa[]>(`${this.apiURL}/usuario/${usuarioId}/nao-concluidas`);
  }

  getTarefasConcluidasByUsuario(usuarioId: number) {
    return this.http.get<Tarefa[]>(`${this.apiURL}/usuario/${usuarioId}/concluidas`);
  }

  getTarefasAtrasadasByUsuario(usuarioId: number) {
    return this.http.get<Tarefa[]>(`${this.apiURL}/usuario/${usuarioId}/atrasadas`);
  }

  marcarComoConcluida(id: number) {
    return this.http.put<Tarefa>(`${this.apiURL}/${id}/concluir`, {});
  }

  desmarcarComoConcluida(id: number) {
    return this.http.put<Tarefa>(`${this.apiURL}/${id}/desmarcar`, {});
  }
}
