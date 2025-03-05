import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { FuncionarioService } from '../../../services/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EmployeeResponse } from '../../../Models/Response/employeeResponse';
import { BaseResponse } from '../../../Models/Response/baseResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.component.html',
  styleUrls: ['./list-funcionarios.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxSpinnerModule, TableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListFuncionariosComponent implements OnInit {
  public funcionarios = [] as EmployeeResponse[];
  private funcionarioService = inject(FuncionarioService);
  private usuarioService = inject(UsuarioService);

  constructor(
    private ngxSpinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.listarFuncionarios();
  }

  private listarFuncionarios() {
    this.ngxSpinner.show();
    this.funcionarioService.getAllEmployees().subscribe({
      next: (response: BaseResponse<EmployeeResponse[]>) => {
        if (response.statusCode === 200) {
          let result = response.result as EmployeeResponse[];
          this.funcionarios = [...result];
        }
        else {
          this.toaster.error(response.message || 'Erro ao listar os funcionários');
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.message || 'Erro ao listar os funcionários');
        this.ngxSpinner.hide();
        this.router.navigate(['/login']);
      },
      complete: () => {
        this.ngxSpinner.hide();
      }
    })
  }
  public gestor(codUsuario: number) {
    this.ngxSpinner.show();
    this.usuarioService.tranformManager(codUsuario).subscribe({
      next: (response: BaseResponse<boolean>) => {
        if (response.statusCode == 200) {
          if (response.result) {
            this.toaster.success("Alteração relizada!");
            this.listarFuncionarios()
          }
          else
            this.toaster.error("A alteração não foi realizada!")
        }
        else {
          this.toaster.warning(response.message || 'Erro ao realizar alteração');
          this.ngxSpinner.hide();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.message || 'Erro ao realizar alteração');
        this.ngxSpinner.hide();
        this.ngxSpinner.hide();
      },
      complete: () => {
        this.ngxSpinner.hide();
      }
    })
  }
  public editar(codUsuario: number) {
    this.router.navigate([`/editar/${codUsuario}`]);
  }
  public isAdm() {
    return this.auth.isAdm();
  }

}
