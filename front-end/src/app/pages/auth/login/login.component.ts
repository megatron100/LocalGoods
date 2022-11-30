import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";
import {User} from "../models/user.model";
import {AuthService} from "../auth.service";
import {AuthResponseData} from "../../../interfaces/auth-response-data";


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

  user: AuthResponseData = {
    userId: '47fvj5h57yhjghrt75yhg',
    userEmail: 'oleg_bob@ukr.net',
    role: 'buyer',
    nickName: 'Oleh Babiak!!!',
    accessToken: 'kjvjvdkjhkdf!!!',
    refreshToken: 'jlfjglkdfjlkrrre',
    }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return
    }
    this.authService.loginTest(this.user)
    this.loginForm.reset();
  }
}
