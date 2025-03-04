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
import { LoginService } from '../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseResponse } from '../../Models/Response/baseResponse';
import { UserResponse } from '../../Models/Response/userResponse';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxMaskDirective, CpfValidatorDirective,
    CommonModule, PasswordModule, InputTextModule, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  request: LoginRequest = new LoginRequest();
  private loginService = inject(LoginService);

  constructor(
    private fb: FormBuilder,
    private ngxSpinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    sessionStorage.clear();
    this.validator();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.request = { ...this.loginForm.value };
      this.ngxSpinner.show();
      this.loginService.login(this.request).subscribe({
        next: (response: BaseResponse<UserResponse>) => {
          if (response.statusCode === 200) {
            var result = response.result as UserResponse;
            sessionStorage.setItem('user', JSON.stringify(result));
            if (this.auth.obterRole(result.token) === 'USUARIO') {
              this.router.navigate([ `/editar/${this.auth.obterCodUsuario(result.token)}`]);
            } else {
              this.router.navigate(['/list-funcionarios']);
            }
          }
          else
            this.toaster.warning(response.message || 'Erro ao realizar login');
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(error.message || 'Erro ao realizar login');
        },
        complete: () => {
          this.ngxSpinner.hide();
        }
      });
    }
  }
  private validator() {
    this.loginForm = this.fb.group({
      cpf: [this.request.cpf, [Validators.required]],
      password: [this.request.password, [Validators.required, PasswordValidator()]]
    });
  }

}
