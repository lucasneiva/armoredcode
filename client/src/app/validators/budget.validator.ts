import { FormGroup } from '@angular/forms';

export function budgetValidator(control: FormGroup): { [s: string]: boolean } | null {
  const minBudget = control.get('min')?.value;
  const maxBudget = control.get('max')?.value;

  if (minBudget && maxBudget && minBudget > maxBudget) {
    return { 'budgetInvalid': true };
  }

  return null;
}