import { Usuario } from './usuario';

export class Tarefa {
  id!: number;
  titulo!: string;
  descricao!: string;
  dataTermino!: Date;
  concluida!: boolean;
  usuario!: Usuario;
}