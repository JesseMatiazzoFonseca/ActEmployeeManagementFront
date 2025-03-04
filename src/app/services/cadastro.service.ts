import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { EmployeeRequest } from '../Models/Request/employeeRequest';
import { Observable } from 'rxjs';
import { BaseResponse } from '../Models/Response/baseResponse';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private urlAPI = environment.urlApiManagaementEmployee;

  constructor(private http: HttpClient) { }

  addEmployee(request: EmployeeRequest): Observable<BaseResponse<number>> {
    return this.http.post(`${this.urlAPI}/Employee/AddEmployee`, request).pipe((response: any) => response);
  }

  putEmployee(request: EmployeeRequest, codUsuario: number): Observable<BaseResponse<number>> {
    return this.http.put(`${this.urlAPI}/Employee/UpdateEmployee?codUsuario=${codUsuario}`, request).pipe((response: any) => response);
  }

  getEmployeeByCodUsuario(codUsuario: number): Observable<BaseResponse<EmployeeRequest>> {
    return this.http.get(`${this.urlAPI}/Employee/GetEmployeeByCodUsuario?codUsuario=${codUsuario}`).pipe((response: any) => response);
  }

}
