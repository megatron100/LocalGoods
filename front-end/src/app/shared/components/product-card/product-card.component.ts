import {Component, Input, OnInit} from '@angular/core';
import {CartService} from 'src/app/services/cart.service';
import {ShopService} from 'src/app/services/shop.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent} from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import {AddToCart} from "../../../core";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {


  @Input() product: any;

  constructor(private cartService: CartService,
              private shopService: ShopService, public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  onClickAdd(model: AddToCart) {

    this.cartService.addToCart(model)
      .subscribe(res => {
        const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
        dialogRef.afterClosed()
      })
  }
}
