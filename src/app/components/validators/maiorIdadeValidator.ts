import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function MaiorIdadeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
     const value: string = control.value || '';

      if (!value) return { required: true };

      const dataNascimento = new Date(value);
      const dataAtual = new Date();
      const idade = dataAtual.getFullYear() - dataNascimento.getFullYear();

      if (idade < 18) {
        return { maiorIdade: 'Você não pode ser menor de idade' };
      }
      return null;

  }
}
