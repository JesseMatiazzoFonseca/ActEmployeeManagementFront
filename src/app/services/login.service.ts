import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../Models/Request/LoginRequest';
import { BaseResponse } from '../Models/Response/baseResponse';
import { UserResponse } from '../Models/Response/userResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlAPI = environment.urlApiManagaementEmployee;

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<BaseResponse<UserResponse>> {
    return this.http.post(`${this.urlAPI}/login/login`, request).pipe((response: any) => response);
  }
}
