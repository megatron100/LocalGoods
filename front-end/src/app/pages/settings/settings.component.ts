import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../auth/models/user.model";
import {AuthService} from "../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {UserDataUpdateDialogComponent} from "./user-data-update-dialog/user-data-update-dialog.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private userSub!: Subscription;
  user!: User;


  constructor(public authService: AuthService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
      })
  }

  openUserEditDialog() {
      const dialogRef = this.dialog.open(UserDataUpdateDialogComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

}
