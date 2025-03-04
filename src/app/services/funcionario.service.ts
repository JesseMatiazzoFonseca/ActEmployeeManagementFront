import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { BaseResponse } from '../Models/Response/baseResponse';
import { EmployeeResponse } from '../Models/Response/employeeResponse';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private urlAPI = environment.urlApiManagaementEmployee;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<BaseResponse<EmployeeResponse[]>> {
    return this.http.get(`${this.urlAPI}/Employee/GetEmployees`).pipe((response: any) => response);
  }

}
