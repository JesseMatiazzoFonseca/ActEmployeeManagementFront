import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserResponse } from '../Models/Response/userResponse';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private router: Router) {
  }
  isAuthenticated(): boolean {
    const user = sessionStorage.getItem('user');
    return !!user;
  }

  isAdm(): boolean {
    const user = sessionStorage.getItem('user');
    if(!user)
      return false;
    const userObjt = JSON.parse(user) as UserResponse;
    const role = this.obterRole(userObjt.token);
    return role === 'ADM'
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || "");
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.getUser()?.token;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date | undefined {
    token = this.getToken()
    const decoded = jwtDecode(token);

    if (decoded.exp === undefined) return undefined;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  decodificarToken(token: string | undefined): any {
    if (!token)
      return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  obterRole(token: string | undefined): any {
    if (!token)
      return null;
    const payload = this.decodificarToken(token);
    return payload ? payload.role : null;
  }

  obterCodUsuario(token: string | undefined): any {
    if (!token)
      return null;
    const payload = this.decodificarToken(token);
    return payload ? payload.Id : null;
  }
}
