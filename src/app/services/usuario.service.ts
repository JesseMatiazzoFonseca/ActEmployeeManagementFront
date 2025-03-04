import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../Models/Response/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private urlAPI = environment.urlApiManagaementEmployee;

  constructor(private http: HttpClient) { }

  tranformManager(codUsuario: number): Observable<BaseResponse<boolean>> {
    return this.http.patch(`${this.urlAPI}/User/TransformManager?codUsuario=${codUsuario}`, null).pipe((response: any) => response);
  }

}
