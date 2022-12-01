import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_PATTERN} from "../../../constants/constants";
import {AuthService} from "../auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading = false;

  constructor(private authService: AuthService) { }

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
    this.authService.register(this.registerForm.value)
      .subscribe(value => {
        this.isLoading = false;
        console.log('reg', value)
      })

  }
}
