import { CartService } from 'src/app/services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { AddToCart, AuthService } from '../../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public topProds!: any[];
  private userSub!: Subscription;
  user!: User;

  constructor(
    public dialog: MatDialog,
    public shopService: ShopService,
    public authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.getTopProds();
  }

  getTopProds() {
    let dataCont: any[];
    this.shopService.getProducts().subscribe((res) => {
      dataCont = res.data.otherProducts;
      dataCont.sort(function (a, b) {
        return (
          parseFloat(b.seller.sellerRating) - parseFloat(a.seller.sellerRating)
        );
      });
      this.topProds = dataCont.splice(0, 3);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  onClickAdd(prod: any) {
    const quantityWithId = 'product-quantity-' + prod.id;
    const quantity = document.getElementById(
      quantityWithId
    ) as HTMLInputElement;
    const model: AddToCart = {
      id: prod.id,
      quantity: Number(quantity.value),
    };

    this.cartService.addToCart(model).subscribe((res) => {
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: res.message,
      });
      dialogRef.afterClosed();
    });
  }
}
