import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromShop from "../../../store";
import {UserState} from "../../../store/user.reducer";
import {MessageDialogComponent} from "../../../shared/dialogs/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";

@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss']
})
export class UserDataUpdateDialogComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private authService: AuthService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog,
    public userService: UserService
    ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let name = '';
    let mobile = '';
    let postCode = '';
    let country = '';
    let city = '';
    let area = '';

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(null, []),
        mobile: new FormControl(null, []),
      }),
      address: new FormGroup({
        postCode: new FormControl(null, []),
        country: new FormControl(null, []),
        city: new FormControl(null, []),
        area: new FormControl(null, []),
      })
    });

    this.subscription = this.store.select('userData')
      .subscribe((state: UserState) => {
        if (state.user) {
          name = state.user.nickName;
          mobile = state.user.mobile || '';
          postCode = state.user.address?.pinCode || '';
          country = state.user.address?.country || ''
          city = state.user.address?.city || ''
          area = state.user.address?.area || ''
        }
      })

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(name, [Validators.required, Validators.minLength(3)]),
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
      .subscribe({
        next: ({data, message}) => {
          this.userService.updateUserInStore(data)
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: message});
          dialogRef.afterClosed()
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color'
          });
          dialogRef.afterClosed()
        }
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
