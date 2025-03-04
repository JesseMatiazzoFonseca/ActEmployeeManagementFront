import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) return { required: true };

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isLongEnough = value.length >= 8;

    if (!isLongEnough) {
      return { passwordStrength: 'A senha deve ter pelo menos 8 caracteres' };
    }
    if (!hasUpperCase) {
      return { passwordStrength: 'A senha deve ter pelo menos uma letra maiúscula' };
    }
    if (!hasNumber) {
      return { passwordStrength: 'A senha deve ter pelo menos um número' };
    }
    return null; // ✅ Senha forte
  };
}
