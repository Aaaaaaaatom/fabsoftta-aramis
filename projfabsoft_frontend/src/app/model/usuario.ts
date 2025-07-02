import { Tarefa } from './tarefa';

export class Usuario {
  id!: number;
  nome!: string;
  email!: string;
  senha!: string;
  tarefas!: Tarefa[];
}
