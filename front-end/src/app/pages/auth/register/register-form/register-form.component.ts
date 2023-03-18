import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService, FormData} from "../../../../core";
import {MatDialog} from "@angular/material/dialog";
import {CustomValidators, FormValidator} from "../../../../validators";
import {MessageDialogComponent} from "../../../../shared/dialogs/message-dialog/message-dialog.component";
import {ErrorDialogComponent} from "../../../../shared/error-handling/error-dialog/error-dialog.component";
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent implements OnChanges {

  registerForm: FormGroup = new FormGroup(
    {},
    {
      validators: CustomValidators.checkPasswords('password', 'rePassword')
    }
  );
  isPassIsVisible = false;
  isRePassIsVisible = false;

  @Input() jsonFormData!: FormData;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private formValidator: FormValidator,
    private formService: FormService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes["jsonFormData"].firstChange) {
      this.formService.createForm(this.jsonFormData.controls, this.registerForm)
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
