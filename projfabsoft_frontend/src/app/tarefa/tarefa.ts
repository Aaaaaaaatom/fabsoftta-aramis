import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../service/tarefa.service';
import { AuthService } from '../service/auth.service';
import { Tarefa } from '../model/tarefa';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-tarefa',
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.css'
})
export class TarefaComponent implements OnInit {
  
  listaTarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];
  currentUser: Usuario | null = null;
  filtroAtivo: string = 'todas';
  
  novaTarefa: Tarefa = {
    id: 0,
    titulo: '',
    descricao: '',
    dataTermino: new Date(),
    concluida: false,
    usuario: {} as Usuario
  };

  mostrarFormulario: boolean = false;

  constructor(
    private tarefaService: TarefaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.carregarTarefas();
      }
    });
  }

  carregarTarefas(): void {
    if (!this.currentUser) return;
    
    this.tarefaService.getTarefasByUsuario(this.currentUser.id).subscribe({
      next: (tarefas) => {
        this.listaTarefas = tarefas;
        this.aplicarFiltro();
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    });
  }

  aplicarFiltro(): void {
    switch (this.filtroAtivo) {
      case 'pendentes':
        this.tarefasFiltradas = this.listaTarefas.filter(t => !t.concluida);
        break;
      case 'concluidas':
        this.tarefasFiltradas = this.listaTarefas.filter(t => t.concluida);
        break;
      case 'atrasadas':
        const hoje = new Date();
        this.tarefasFiltradas = this.listaTarefas.filter(t => 
          !t.concluida && new Date(t.dataTermino) < hoje
        );
        break;
      default:
        this.tarefasFiltradas = this.listaTarefas;
    }
  }

  alterarFiltro(filtro: string): void {
    this.filtroAtivo = filtro;
    this.aplicarFiltro();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.resetarFormulario();
    }
  }

  salvarTarefa(): void {
    if (!this.currentUser) return;
    
    this.novaTarefa.usuario = this.currentUser;
    
    this.tarefaService.saveTarefa(this.novaTarefa).subscribe({
      next: () => {
        this.carregarTarefas();
        this.toggleFormulario();
      },
      error: (error) => {
        console.error('Erro ao salvar tarefa:', error);
      }
    });
  }

  toggleConcluida(tarefa: Tarefa): void {
    if (tarefa.concluida) {
      this.tarefaService.desmarcarComoConcluida(tarefa.id).subscribe({
        next: () => this.carregarTarefas(),
        error: (error) => console.error('Erro ao desmarcar tarefa:', error)
      });
    } else {
      this.tarefaService.marcarComoConcluida(tarefa.id).subscribe({
        next: () => this.carregarTarefas(),
        error: (error) => console.error('Erro ao marcar tarefa:', error)
      });
    }
  }

  excluirTarefa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.tarefaService.excluirTarefa(id).subscribe({
        next: () => this.carregarTarefas(),
        error: (error) => console.error('Erro ao excluir tarefa:', error)
      });
    }
  }

  resetarFormulario(): void {
    this.novaTarefa = {
      id: 0,
      titulo: '',
      descricao: '',
      dataTermino: new Date(),
      concluida: false,
      usuario: {} as Usuario
    };
  }

  isAtrasada(tarefa: Tarefa): boolean {
    return !tarefa.concluida && new Date(tarefa.dataTermino) < new Date();
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  get tarefasPendentesCount(): number {
    return this.listaTarefas.filter(t => !t.concluida).length;
  }

  get tarefasConcluidasCount(): number {
    return this.listaTarefas.filter(t => t.concluida).length;
  }

  get tarefasAtrasadasCount(): number {
    return this.listaTarefas.filter(t => this.isAtrasada(t)).length;
  }
}
