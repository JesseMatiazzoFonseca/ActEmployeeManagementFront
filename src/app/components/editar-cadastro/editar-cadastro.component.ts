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
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../../Models/Response/baseResponse';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeRequest } from '../../Models/Request/employeeRequest';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { MaiorIdadeValidator } from '../validators/maiorIdadeValidator';
import { EmailValidator } from '../validators/emailValidator';
import { CadastroService } from '../../services/cadastro.service';
import { AuthService } from '../../services/auth.service';
import { UserResponse } from '../../Models/Response/userResponse';


@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrls: ['./editar-cadastro.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NgxMaskDirective,
    PasswordModule, InputTextModule, NgxSpinnerModule, FloatLabelModule, CpfValidatorDirective,
    DatePickerModule, InputMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EditarCadastroComponent implements OnInit {

  private cadastroService = inject(CadastroService);
  public formCadastro!: FormGroup;
  public request = {} as EmployeeRequest;
  private codUsuario: any;
  private user = JSON.parse(sessionStorage.getItem('user') || "") as UserResponse | null;

  constructor(
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private auth: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.codUsuario = this.activeRoute.snapshot.paramMap.get('codUsuario') || null;
    this.validator();
    this.getFuncionario();
  }

  onSubmit() {
    if (this.formCadastro.valid) {
      let codUsuario = this.auth.obterCodUsuario(this.user?.token);
      this.request = { ...this.formCadastro.value };
      this.ngxSpinner.show();
      this.cadastroService.putEmployee(this.request, codUsuario).subscribe({
        next: (response: BaseResponse<number>) => {
          if (response.statusCode === 200) {
            this.toaster.success('Alteração realizado com sucesso');
          }
          else
            this.toaster.warning(response.message || 'Erro ao realizar alteração');
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(error.message || 'Erro ao realizar alteração');
          this.ngxSpinner.hide();
        },
        complete: () => {
          this.ngxSpinner.hide();
        }
      });
    }
  }
  sair() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  btnSuibmit() {
    this.onSubmit();
  }
  private getFuncionario() {
    if (!this.auth.isAdm())
      this.codUsuario = this.auth.obterCodUsuario(this.user?.token);
    if (!this.codUsuario) {
      this.toaster.warning("Código do usuario invalido");
      this.router.navigate(['/login']);
    }
    this.ngxSpinner.show();
    this.cadastroService.getEmployeeByCodUsuario(Number.parseInt(this.codUsuario)).subscribe({
      next: (response: BaseResponse<EmployeeRequest>) => {
        if (response.statusCode == 200) {
          let result = response.result as EmployeeRequest;
          this.formCadastro.patchValue({ ...result, user: { ...result } });
          this.formCadastro.patchValue({
            dataNascimento: result.dtNascimentoAux ? new Date(result.dtNascimentoAux).toISOString().split('T')[0]
              : null
          })
        }
        else {
          this.toaster.warning(response.message || 'Erro ao consultar o funcionario');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.message || 'Erro ao realizar consulta');
        this.ngxSpinner.hide();
        this.router.navigate(["/login"]);
      },
      complete: () => {
        this.ngxSpinner.hide();
      }
    })
  }
  private validator() {
    this.formCadastro = this.fb.group({
      user: this.fb.group({
        cpf: [this.request.user?.cpf, [Validators.required]],
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
