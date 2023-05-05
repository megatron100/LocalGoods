import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomValidators, FormValidator } from '../../../validators';
import { SettingsService } from '../../../services/settings.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../../shared/dialogs/message-dialog/message-dialog.component';
import { ErrorDialogComponent } from '../../../shared/error-handling/error-dialog/error-dialog.component';
import { FormData } from '../../../core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-user-update-pass-dialog',
  templateUrl: './user-update-pass-dialog.component.html',
  styleUrls: ['./user-update-pass-dialog.component.scss'],
})
export class UserUpdatePassDialogComponent implements OnInit {
  passForm: FormGroup = new FormGroup(
    {},
    {
      validators: CustomValidators.checkPasswords('newPassword', 'passConfirm'),
    }
  );
  public formData!: FormData;

  constructor(
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private formValidator: FormValidator,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.formService.getUpdatePasswordJson().subscribe((formData: FormData) => {
      this.formData = formData;
      this.formService.createForm(formData.controls, this.passForm);
    });
  }

  onSubmit() {
    this.settingsService.changePassword(this.passForm.value).subscribe({
      next: ({ message }) => {
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: message,
        });
        dialogRef.afterClosed();
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: err,
          panelClass: 'color',
        });
        dialogRef.afterClosed();
      },
    });
  }

  getError(e: string) {
    return this.passForm.get(e);
  }

  get _errorMessage() {
    return this.formValidator.errorMessage;
  }

  onTogglePassVisible(controlName: string) {
    for (const control of this.formData.controls) {
      control.name === controlName
        ? (control.isPassIsVisible = !control.isPassIsVisible)
        : control.isPassIsVisible;
    }
  }
}
