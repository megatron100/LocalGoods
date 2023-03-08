import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import {AddToCart} from "../../core";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor( private shopService: ShopService,
                private cartService: CartService,
                private route: ActivatedRoute,public dialog: MatDialog ) { }

  @Input() product: any;

  ngOnInit(): void {
    this.getProductDets();
  }


  getProductDets(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.shopService.getProductDets(id)
        .subscribe(response => {
          this.product = response.data
        })
  }

  onClickAdd(id: number) {
    let quantityWithId='product-quantity-'+id;
    const quantity = document.getElementById(quantityWithId) as HTMLInputElement;
    let model: AddToCart={
      id:id,
      quantity: Number(quantity.value)
    };

    this.cartService.addToCart(model)
        .subscribe(res => {
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
       dialogRef.afterClosed()
        })


  }
}
