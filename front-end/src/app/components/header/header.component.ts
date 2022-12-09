import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../pages/auth/auth.service";
import {User} from "../../pages/auth/models/user.model";
import {Store} from "@ngrx/store";
import * as fromShop from "../../store";
import {UserState} from "../../store/user.reducer";

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

  constructor(public authService: AuthService,  private store: Store<fromShop.AppState>) {
  }

  ngOnInit(): void {
    this.store.select('userData')
      .subscribe((state: UserState) => {
        if (state.user) {
          this.user = state.user
        }
        this.isUserAuth = !!state.user;
      })
  }

  onLogout() {
    this.authService.logout()
  }


  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
