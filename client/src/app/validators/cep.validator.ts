import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cep = control.value;

    if (!cep) {
      return null; // Don't validate empty input
    }

    // Regular expression to check CEP format (00000-000)
    const cepRegex = /^\d{5}-\d{3}$/;

    if (!cepRegex.test(cep)) {
      return { cepInvalid: true };
    }

    return null; // CEP is valid
  };
}