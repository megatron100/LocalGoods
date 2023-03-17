import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";
import {AuthService} from "../../../core";
import {FormValidator, ValidationType} from "../../../validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isPassIsVisible = false;

  loginForm!: FormGroup

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private formValidator: FormValidator
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, this.formValidator.validate(ValidationType.EMAIL)]),
      'password': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(this.formValidator.minPasswordLength),
          this.formValidator.validate(ValidationType.PASSWORD)
        ])
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color' // Add your custom panel class
          });
          dialogRef.afterClosed()
        }
      });
  }

  get _errorMessage() {
    return this.formValidator.errorMessage;
  }

  get _email() {
    return this.loginForm.get('email');
  }

  get _password() {
    return this.loginForm.get('password');
  }

  onTogglePassVisible() {
    this.isPassIsVisible = !this.isPassIsVisible;
  }
}
