import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function EmailValidator(): ValidatorFn {
  return (control : AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) return { required: true };

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!emailRegex.test(value)) {
      return { emailInvalid: 'E-mail inválido' };
    }
    return null;
  }
}
