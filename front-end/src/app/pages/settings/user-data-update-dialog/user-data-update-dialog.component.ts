import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../services/settings.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromShop from "../../../store";
import {UserState} from "../../../store/user.reducer";
import {MessageDialogComponent} from "../../../shared/dialogs/message-dialog/message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {ErrorDialogComponent} from "../../../shared/error-handling/error-dialog/error-dialog.component";
import {AuthService} from "../../../core";
import {AutoUnsubscribe} from "../../../shared/utils/decorators";


@AutoUnsubscribe('subscription')
@AutoUnsubscribe('subscription2')
@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss']
})
export class UserDataUpdateDialogComponent implements OnInit {

  userForm: FormGroup = new FormGroup({});
  private subscription = new Subscription();
  country!: string;
  area!: string;
  city!: string;
  mobile!: string;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let postCode = '';

    this.subscription.add(
      this.store.select('userData')
        .subscribe((state: UserState) => {
          if (state.user) {
            name = state.user.nickName;
            this.mobile = state.user.mobile || '';
            postCode = state.user.address?.pinCode || '';
            this.country = state.user.address?.country || ''
            this.city = state.user.address?.city || ''
            this.area = state.user.address?.area || ''
          }
        }));

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(name, [Validators.required, Validators.minLength(3)]),
        mobile: new FormControl(this.mobile, [Validators.required]),
      }),
      address: new FormGroup({
        postCode: new FormControl(postCode, [Validators.required]),
        country: new FormControl(this.country, [Validators.required]),
        city: new FormControl(this.city, [Validators.required]),
        area: new FormControl(this.area, [Validators.required]),
      })
    })

  }


  onSubmit() {
    this.settingsService.updateUserInfo(this.userForm.value)
      .subscribe({
          next: ({data: data, message: message}) => {
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
        }
      )
  }

  setDialCode($event: any) {
    this.userForm.get('basicInfo')?.get('mobile')?.setValue($event)
  }
}
