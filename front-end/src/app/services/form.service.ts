import { Injectable } from '@angular/core';
import {Control} from "../core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators, FormValidator} from "../validators";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formValidator: FormValidator) { }

  createForm(controls: Control[], form: FormGroup) {
    for (const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control?.validators)) {
        switch (key) {
          case 'required':
            if(value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if(value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'message':
            validatorsToAdd.push(this.formValidator.validate(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            validatorsToAdd.push(Validators.nullValidator);
            break;
          default:
            break;
        }
      }

      form?.addControl(
        control?.name,
        new FormControl(control?.value, validatorsToAdd)
      )
    }
  }
}
