import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appCpfValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CpfValidatorDirective, multi: true }]
})
export class CpfValidatorDirective implements Validators {

  validate(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;
    if (cpf && !this.isValidCpf(cpf)) {
      return { 'cpfInvalid': true };
    }
    return null;
  }
  private isValidCpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }
    return true;
  }

}
