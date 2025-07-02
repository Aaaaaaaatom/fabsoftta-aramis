import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  isLoginMode = true;
  errorMessage = '';
  isLoading = false;

  loginData = {
    email: '',
    senha: ''
  };

  registerData: Usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: '',
    tarefas: []
  };

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.resetForms();
  }

  login(): void {
    if (!this.loginData.email || !this.loginData.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.usuarioService.login(this.loginData.email, this.loginData.senha).subscribe({
      next: (usuario) => {
        this.authService.setCurrentUser(usuario);
        this.router.navigate(['/tarefas']);
      },
      error: (error) => {
        this.errorMessage = 'Email ou senha incorretos.';
        this.isLoading = false;
      }
    });
  }

  register(): void {
    if (!this.registerData.nome || !this.registerData.email || !this.registerData.senha) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.registerData.senha.length < 6) {
      this.errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Create user data without the tarefas array
    const userData = {
      nome: this.registerData.nome,
      email: this.registerData.email,
      senha: this.registerData.senha
    };

    this.usuarioService.createUsuario(userData).subscribe({
      next: (usuario) => {
        console.log('Usuario criado com sucesso:', usuario);
        this.authService.setCurrentUser(usuario);
        this.router.navigate(['/tarefas']);
      },
      error: (error) => {
        console.error('Erro completo ao criar usuario:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error object:', error.error);
        
        if (error.status === 0) {
          this.errorMessage = 'Erro de conexão. Verifique se o backend está rodando.';
        } else if (error.status === 500) {
          this.errorMessage = 'Erro interno do servidor.';
        } else {
          this.errorMessage = `Erro ao criar conta: ${error.status} - ${error.message}`;
        }
        this.isLoading = false;
      }
    });
  }

  resetForms(): void {
    this.loginData = { email: '', senha: '' };
    this.registerData = { id: 0, nome: '', email: '', senha: '', tarefas: [] };
  }
}
