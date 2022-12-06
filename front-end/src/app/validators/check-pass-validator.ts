import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class CustomValidators {
  static checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('newPassword')?.value;
    let confirmPass = group.get('passConfirm')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
}
