import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomValidators {
  static checkPasswords(pass1: string, pass2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get(pass1)?.value;
      const confirmPass = group.get(pass2)?.value;
      return pass === confirmPass ? null : { notSame: true };
    };
  }
}
