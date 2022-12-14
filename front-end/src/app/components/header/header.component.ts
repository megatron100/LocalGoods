import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
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
  isUserAuth: boolean = false;
  private userSub!: Subscription;
  cart!:IProduct[];
  user!: User;

  constructor(public authService: AuthService,
              private cartService: CartService,
              // private store: Store<fromShop.AppState>
              ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => {
        if (user) {
          console.log('user', user)
          this.user = user
        }
        this.isUserAuth = !!user;
      });
      this.cart = this.cartService.cartContent;
    // this.store.select('userData')
    //   .subscribe((state: UserState) => {
    //     if (state.user) {
    //       this.user = state.user
    //     }
    //     this.isUserAuth = !!this.user;
    //   });
      this.cart = this.cartService.cartContent;
  }

  onLogout() {
    this.authService.logout()
  }


  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
