import { FormGroup } from '@angular/forms';

//compare the values and return if they are valid
export function hourlyRateValidator(control: FormGroup): { [s: string]: boolean } | null {
  const minRate = control.get('min')?.value;
  const maxRate = control.get('max')?.value;

  if (minRate && maxRate && minRate > maxRate) {
    return { 'hourlyRateInvalid': true };
  }

  return null;
}