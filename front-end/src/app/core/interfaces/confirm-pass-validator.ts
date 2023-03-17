import {AbstractControl, ValidationErrors} from "@angular/forms";

export declare interface confirmPassValidator {
  (control: AbstractControl, password: string, confPass: string): ValidationErrors | null;
}
