import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'nickName': new FormControl('oleg', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('oleg_bob@ukr.net', [Validators.required, Validators.email, Validators.pattern(EMAIL_PATTERN)]),
      'password': new FormControl('111111', [Validators.required, Validators.minLength(6)]),
      'password-confirm': new FormControl('111111', [Validators.required, Validators.minLength(6)]),
      'role': new FormControl('seller', [Validators.required])
    })
  }

  onSubmit() {
    // if (!this.registerForm.valid) {
    //   return
    // }
    console.log(this.registerForm)

  }
}
