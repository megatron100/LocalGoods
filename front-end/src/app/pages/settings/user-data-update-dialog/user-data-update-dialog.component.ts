import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../../services/settings.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../store';
import { UserState } from '../../../store/user.reducer';
import { MessageDialogComponent } from '../../../shared/dialogs/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { ErrorDialogComponent } from '../../../shared/error-handling/error-dialog/error-dialog.component';
import { AuthService } from '../../../core';
import { AutoUnsubscribe } from '../../../shared/utils/decorators';
import { User } from '../../auth/models/user.model';

@AutoUnsubscribe('subscription')
@AutoUnsubscribe('subscription2')
@Component({
  selector: 'app-user-data-update-dialog',
  templateUrl: './user-data-update-dialog.component.html',
  styleUrls: ['./user-data-update-dialog.component.scss'],
})
export class UserDataUpdateDialogComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  private subscription = new Subscription();
  user!: User;
  city!: string;

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private store: Store<fromShop.AppState>,
    public dialog: MatDialog,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.subscription.add(
      this.store.select('userData').subscribe((state: UserState) => {
        if (state.user) {
          this.user = state.user;
        }
      })
    );

    this.userForm = new FormGroup({
      basicInfo: new FormGroup({
        name: new FormControl(this.user.nickName, [
          Validators.required,
          Validators.minLength(3),
        ]),
        mobile: new FormControl(this.user.mobile, [Validators.required]),
      }),
      address: new FormGroup({
        postCode: new FormControl(this.user.address?.pinCode, [
          Validators.required,
        ]),
        country: new FormControl(this.user.address?.country, [
          Validators.required,
        ]),
        city: new FormControl(this.user.address?.city, [Validators.required]),
        area: new FormControl(this.user.address?.area, [Validators.required]),
      }),
    });
  }

  onSubmit() {
    this.settingsService.updateUserInfo(this.userForm.value).subscribe({
      next: ({ data: data, message: message }) => {
        this.userService.updateUserInStore(data);
        const dialogRef = this.dialog.open(MessageDialogComponent, {
          data: message,
        });
        dialogRef.afterClosed();
      },
      error: (err) => {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: err,
          panelClass: 'color',
        });
        dialogRef.afterClosed();
      },
    });
  }

  setDialCode($event: string) {
    this.userForm.get('basicInfo')?.get('mobile')?.setValue($event);
  }
}
