import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../auth/models/user.model";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private userSub!: Subscription;
  user!: User;


  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => {
        if (user) {
          this.user = user;
        }
      })
  }

}
