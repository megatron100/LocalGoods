import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService, FormData } from '../../../../core';
import { MatDialog } from '@angular/material/dialog';
import { FormValidator } from '../../../../validators';
import { FormGroup } from '@angular/forms';
import { ErrorDialogComponent } from '../../../../shared/error-handling/error-dialog/error-dialog.component';
import { FormService } from '../../../../services/form.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnChanges {
  loginForm: FormGroup = new FormGroup({});
  isPassIsVisible = false;

  @Input() jsonFormData!: FormData;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private formValidator: FormValidator,
    private formService: FormService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      this.formService.createForm(this.jsonFormData.controls, this.loginForm);
    }
    console.log('FC', this.loginForm);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {},
      error: (err) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: err,
          panelClass: 'color', // Add your custom panel class
        });
        dialogRef.afterClosed();
      },
    });
  }

  get _errorMessage() {
    return this.formValidator.errorMessage;
  }

  getError(e: string) {
    return this.loginForm.get(e);
  }

  onTogglePassVisible() {
    this.isPassIsVisible = !this.isPassIsVisible;
  }
}
