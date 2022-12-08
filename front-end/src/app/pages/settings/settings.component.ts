import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../auth/models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {UserDataUpdateDialogComponent} from "./user-data-update-dialog/user-data-update-dialog.component";
import {UserUpdatePassDialogComponent} from "./user-update-pass-dialog/user-update-pass-dialog.component";
import {Store} from "@ngrx/store";
import * as fromShop from "../../store";
import {UserState} from "../../store/user.reducer";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private userSub!: Subscription;
  user!: User;


  constructor(public dialog: MatDialog, private store: Store<fromShop.AppState>, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.updateUser()
    this.userSub = this.store.select('userData')
      .subscribe((state: UserState) => {
        if (state.user) {
          state.user
          this.user = state.user;
        }
      })
  }

  openUserEditDialog() {
      const dialogRef = this.dialog.open(UserDataUpdateDialogComponent);
      dialogRef.afterClosed()
    }

  openPassChangeDialog() {
    const dialogRef = this.dialog.open(UserUpdatePassDialogComponent);
    dialogRef.afterClosed()
  }
}
