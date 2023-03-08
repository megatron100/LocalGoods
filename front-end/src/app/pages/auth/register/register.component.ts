import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageDialogComponent} from "../../../shared/dialogs/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";
import {AuthService} from "../../../core";
import {EMAIL_PATTERN} from "../../../shared/constants/constants";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading = false;
  isPassIsVisible = false;
  isRePassIsVisible = false;

  constructor(private authService: AuthService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.pattern(EMAIL_PATTERN)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'rePassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'role': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return
    }
    this.isLoading = true;
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: ({message}) => {
          this.isLoading = false;
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: message});
          dialogRef.afterClosed()
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color'
          });
          dialogRef.afterClosed()
          this.isLoading = false
        }
      })

  }

  onTogglePassVisible() {
    this.isPassIsVisible = !this.isPassIsVisible;
  }

  onToggleRePassVisible() {
    this.isRePassIsVisible = !this.isRePassIsVisible;
  }
}
