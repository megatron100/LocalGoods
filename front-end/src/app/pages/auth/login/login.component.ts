import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    console.log(this.loginForm.value)
    this.loginForm.reset();
  }
}
