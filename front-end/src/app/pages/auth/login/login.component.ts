import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";
import {AuthService} from "../auth.service";

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

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }

    this.isLoading = true

    this.authService.login(this.loginForm.value)
      .subscribe(value => {
        this.isLoading = true
      });
  }
}
