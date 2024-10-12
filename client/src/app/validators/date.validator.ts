import { FormControl } from '@angular/forms';

//validate if end date is valid
export function endDateValidator(control: FormControl): { [s: string]: boolean } | null {
  const startDateControl = control.parent?.get('startDate');

  if (startDateControl && control.value) {
    const startDate = new Date(startDateControl.value);
    const endDate = new Date(control.value);
    /*debug*/console.log("dates received");

    if (endDate < startDate) {
      return { 'endDateInvalid': true };
    }
  }

  return null;
}