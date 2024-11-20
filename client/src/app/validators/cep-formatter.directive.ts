import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCepFormatter]',
  standalone: true,
})
export class CepFormatterDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    this.onInputChange(event.target.value, true);
  }


  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    if (backspace && newVal.length <= 6) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 5) {
      newVal = newVal.substring(0, 5);
    } else {
      newVal = newVal.substring(0, 5) + '-' + newVal.substring(5, 8);
    }
    this.ngControl.valueAccessor?.writeValue(newVal);
  }
}
