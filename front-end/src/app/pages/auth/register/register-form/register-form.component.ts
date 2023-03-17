import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, Control, FormData} from "../../../../core";
import {MatDialog} from "@angular/material/dialog";
import {CustomValidators, FormValidator} from "../../../../validators";
import {MessageDialogComponent} from "../../../../shared/dialogs/message-dialog/message-dialog.component";
import {ErrorDialogComponent} from "../../../../shared/error-handling/error-dialog/error-dialog.component";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent implements OnChanges {

  registerForm: FormGroup = new FormGroup({});
  isPassIsVisible = false;
  isRePassIsVisible = false;

  @Input() jsonFormData!: FormData;

  constructor(private authService: AuthService, public dialog: MatDialog, private formValidator: FormValidator) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes["jsonFormData"].firstChange) {
      this.createForm(this.jsonFormData.controls)
    }
    console.log(';(', this.registerForm)
  }

  createForm(controls: Control[]) {
    for (const control of controls) {
      const validatorsToAdd = [];
      console.log('!!!', control)
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

      this.registerForm?.addControl(
        control?.name,
        new FormControl(control?.value, validatorsToAdd)
      )
      this.registerForm?.addValidators(CustomValidators.xxx('password', 'rePassword'))
    }
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return
    }
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: ({message}) => {
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: message});
          dialogRef.afterClosed()
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color'
          });
          dialogRef.afterClosed()
        }
      })

  }

  getError(e: string) {
    return this.registerForm.get(e)
  }

  get _errorMessage() {
    return this.formValidator.errorMessage;
  }

  onTogglePassVisible() {
    this.isPassIsVisible = !this.isPassIsVisible;
  }

  onToggleRePassVisible() {
    this.isRePassIsVisible = !this.isRePassIsVisible;
  }

}
