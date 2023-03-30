import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import * as fromShop from '../../../store';
import { UserState } from '../../../store/user.reducer';
import { AuthService, IProduct } from '../../../core';
import { User } from '../../../pages/auth/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuth = false;
  private userSub!: Subscription;
  cart!: IProduct[];
  user!: User;

  @ViewChild('menu', { read: ViewContainerRef }) menu!: ViewContainerRef;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private store: Store<fromShop.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
      this.isUserAuth = !!user;
    });
    this.cart = this.cartService.cartContent;

    this.store.select('userData').subscribe((state: UserState) => {
      if (state.user) {
        this.user = state.user;
      }
      this.isUserAuth = !!state.user;
    });
    this.cart = this.cartService.cartContent;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
