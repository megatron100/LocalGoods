import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {EMAIL_PATTERN} from "../../../constants/constants";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss']
})
export class UserDataUpdateDialogComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  private subscription!: Subscription;

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let name = '';
    let email = '';
    let mobile = '';
    let postCode = '';
    let country = '';
    let city = '';
    let area = '';

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(null, []),
        email: new FormControl(null, [Validators.email, Validators.pattern(EMAIL_PATTERN)]),
        mobile: new FormControl(null, []),
      }),
      address: new FormGroup({
        postCode: new FormControl(null, []),
        country: new FormControl(null, []),
        city: new FormControl(null, []),
        area: new FormControl(null, []),
      })
    });

    this.subscription = this.authService.user
      .subscribe(user => {
        if(user) {
          name = user.nickName;
          email = user.email;
          mobile = user.mobile || '';
          postCode = user.address?.pinCode || '';
          country = user.address?.country || ''
          city = user.address?.city || ''
          area = user.address?.area || ''
        }
      })

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(name, [Validators.required, Validators.minLength(3)]),
        email: new FormControl(email, [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
        mobile: new FormControl(mobile, []),
      }),
      address: new FormGroup({
        postCode: new FormControl(postCode, []),
        country: new FormControl(country, []),
        city: new FormControl(city, []),
        area: new FormControl(area, []),
      })
    })
  }


  onSubmit() {
    this.settingsService.updateUserInfo(this.userForm.value)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
