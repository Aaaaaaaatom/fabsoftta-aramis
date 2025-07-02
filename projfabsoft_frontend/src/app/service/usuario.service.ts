import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  apiURL = "http://localhost:8080/api/usuarios";

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get<Usuario[]>(this.apiURL);
  }

  getUsuarioById(id: number) {
    return this.http.get<Usuario>(`${this.apiURL}/${id}`);
  }

  getUsuarioByEmail(email: string) {
    return this.http.get<Usuario>(`${this.apiURL}/email/${email}`);
  }

  createUsuario(usuario: Partial<Usuario>) {
    return this.http.post<Usuario>(this.apiURL, usuario);
  }

  updateUsuario(id: number, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiURL}/${id}`, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  login(email: string, senha: string) {
    return this.http.post<Usuario>(`${this.apiURL}/login`, { email, senha });
  }
}
