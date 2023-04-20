import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../store';
import { UserState } from '../../../store/user.reducer';
import { AuthService, CartItem } from '../../../core';
import { User } from '../../../pages/auth/models/user.model';
import { AutoUnsubscribe } from '../../utils/decorators';

@AutoUnsubscribe('authSubs')
@AutoUnsubscribe('userSubs')
@AutoUnsubscribe('cartSubs')
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserAuth = false;
  user!: User;
  cartCounter = 0;
  private authSubs = new Subscription();
  private userSubs = new Subscription();
  private cartSubs = new Subscription();
  btnIsHighlighted = false;

  @ViewChild('menu', { read: ViewContainerRef }) menu!: ViewContainerRef;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private store: Store<fromShop.AppState>
  ) {}

  ngOnInit(): void {
    this.authSubs.add(
      this.authService.user.subscribe((user) => {
        if (user) {
          this.user = user;
        }
        this.isUserAuth = !!user;
      })
    );

    this.userSubs.add(
      this.store.select('userData').subscribe((state: UserState) => {
        if (state.user) {
          this.user = state.user;
        }
        this.isUserAuth = !!state.user;
      })
    );

    this.cartSubs.add(
      this.cartService.cartContent.subscribe({
        next: (value: CartItem[]) => {
          this.btnIsHighlighted = true;
          setTimeout(() => {
            this.btnIsHighlighted = false;
          }, 300);
          this.cartCounter = value.length;
        },
      })
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
