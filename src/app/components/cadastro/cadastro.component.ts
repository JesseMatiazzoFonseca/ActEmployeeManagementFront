import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit } from '@angular/core';
import { LoginRequest } from '../../Models/Request/LoginRequest';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CpfValidatorDirective } from '../../directive/cpfValidator.directive';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { PasswordValidator } from '../validators/passwordValidator';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../../Models/Response/baseResponse';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeeRequest } from '../../Models/Request/employeeRequest';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { MaiorIdadeValidator } from '../validators/maiorIdadeValidator';
import { EmailValidator } from '../validators/emailValidator';
import { CadastroService } from '../../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective,
    PasswordModule, InputTextModule, NgxSpinnerModule, FloatLabelModule, CpfValidatorDirective,
    DatePickerModule, InputMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CadastroComponent implements OnInit {

  private cadastroService = inject(CadastroService);
  public formCadastro!: FormGroup;
  public request = {} as EmployeeRequest;

  constructor(
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.validator();
  }

  onSubmit() {
    if (this.formCadastro.valid) {
      this.request = { ...this.formCadastro.value, user: { ...this.formCadastro.value.user, roles: this.formCadastro.value.user.roles || 'USUARIO' } };
      this.ngxSpinner.show();
      this.cadastroService.addEmployee(this.request).subscribe({
        next: (response: BaseResponse<number>) => {
          if (response.statusCode === 200) {
            this.toaster.success('Cadastro realizado com sucesso');
            this.router.navigate(['/login']);
          }
          else
            this.toaster.warning(response.message || 'Erro ao realizar cadastro');
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(error.message || 'Erro ao realizar cadastro');
          this.ngxSpinner.hide();
        },
        complete: () => {
          this.ngxSpinner.hide();
        }
      });
    }
  }

  btnSuibmit() {
    this.onSubmit();
  }
  private validator() {
    this.formCadastro = this.fb.group({
      user: this.fb.group({
        cpf: [this.request.user?.cpf, [Validators.required]],
        password: [this.request.user?.password, [Validators.required, PasswordValidator()]],
        roles: [this.request.user?.roles]
      }),
      nome: [this.request.nome, [Validators.required]],
      sobrenome: [this.request.sobrenome, [Validators.required]],
      telefone: [this.request.telefone, [Validators.required]],
      celular: [this.request.celular, [Validators.required]],
      email: [this.request.email, [Validators.required, EmailValidator()]],
      cep: [this.request.cep, [Validators.required]],
      dataNascimento: [this.request.dataNascimento, [Validators.required, MaiorIdadeValidator()]],
      nomeGestor: [this.request.nomeGestor, [Validators.required]],
    });
  }

}
