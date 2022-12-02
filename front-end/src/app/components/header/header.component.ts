import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../pages/auth/auth.service";
import {User} from "../../pages/auth/models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  isUserAuth: boolean = false;
  private userSub!: Subscription;
  user!: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => {
        if (user) {
          console.log('user', user)
          this.user = user
        }
        this.isUserAuth = !!user;
      })
  }

  onLogout() {
    this.authService.logout()
  }


  onSettingsShow() {

  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
