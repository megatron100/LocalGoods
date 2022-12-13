import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";
import {AuthService} from "../auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }

    this.isLoading = true

    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.isLoading = true
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color' // Add your custom panel class
          });
          dialogRef.afterClosed()
          this.isLoading = false
        }
      });
  }
}
