import { AbstractControl, ValidationErrors } from '@angular/forms';

export function uppercaseLowercaseValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (value && !/[a-z]/.test(value)) {
    return { uppercaseLowercase: true };
  }

  if (value && !/[A-Z]/.test(value)) {
    return { uppercaseLowercase: true };
  }

  return null;
}