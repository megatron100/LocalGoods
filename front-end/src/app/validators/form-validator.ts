import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ValidationType } from './enum';

@Injectable({ providedIn: 'root' })
export class FormValidator {
  readonly minPasswordLength = 8;

  readonly minProjectIdLength = 8;

  readonly errorMessage = {
    required: 'Please fill in this field',
    minlength: `Must be at least ${this.minPasswordLength} characters`,
    passwordsMustMatch: 'Passwords do not match',
    greaterThanLesson: 'Should be greater than lesson time',
  };

  private validationMessage = {
    onlyLatinsNumbersSpecialChars: 'Should contain only Latin letters, numbers and symbols -, _',
    onlyLatins: 'Should contain only Latin letters',
    onlyNumbers: 'Should contain only numbers',
    containLink: 'Should contain a link (https://...)',
    email: 'Should be a valid email address',
    password: 'Should contain only Latin letters, numbers and at least 1 capital letter, 1 small letter and 1 number',
    dateInFuture: 'Should be time in the future',
  };

  private pattern = {
    onlyLatinsNumbersSpecialChars: new RegExp(/^[A-Za-z0-9_-]+$/),
    onlyLatins: new RegExp(/^[A-Za-z]+$/),
    onlyNumbers: new RegExp(/^[0-9]+$/),
    containLink: new RegExp(/^https:\/\/.*$/),
    email: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
    password: new RegExp(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9]{3,}$/),
    projectId: new RegExp(/^[0-9]{8}$/),
  };

  validate(type: ValidationType) {
    switch (type) {
      case ValidationType.ONLY_LATINS_NUMBERS_CHARS: {
        return this.checkField(
          this.pattern[ValidationType.ONLY_LATINS_NUMBERS_CHARS],
          this.validationMessage[ValidationType.ONLY_LATINS_NUMBERS_CHARS]
        );
      }
      case ValidationType.ONLY_LATINS: {
        return this.checkField(
          this.pattern[ValidationType.ONLY_LATINS],
          this.validationMessage[ValidationType.ONLY_LATINS]
        );
      }
      case ValidationType.ONLY_NUMBERS: {
        return this.checkField(
          this.pattern[ValidationType.ONLY_NUMBERS],
          this.validationMessage[ValidationType.ONLY_NUMBERS]
        );
      }
      case ValidationType.CONTAIN_LINK: {
        return this.checkField(
          this.pattern[ValidationType.CONTAIN_LINK],
          this.validationMessage[ValidationType.CONTAIN_LINK]
        );
      }
      case ValidationType.EMAIL: {
        return this.checkField(
          this.pattern[ValidationType.EMAIL],
          this.validationMessage[ValidationType.EMAIL]
        );
      }
      case ValidationType.PASSWORD: {
        return this.checkField(
          this.pattern[ValidationType.PASSWORD],
          this.validationMessage[ValidationType.PASSWORD]
        );
      }
      default:
        return (): ValidatorFn => () => null;
    }
  }

  private checkField(pattern: RegExp, message: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = pattern.test(control.value);
      return valid ? null : { message: message };
    };
  }
}
