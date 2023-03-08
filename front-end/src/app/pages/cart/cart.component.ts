import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart.service';
import { MessageDialogComponent } from 'src/app/shared/dialogs/message-dialog/message-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/error-handling/error-dialog/error-dialog.component';
import {AddToCart} from "../../core";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart!: any[];
  cartWithQuantity: any;

  constructor( private cartService: CartService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getCart();

  }

  getCart() {
    this.cartService.getCart()
        .subscribe(res => {
          this.cart = res.data.cartItems;
          this.cartWithQuantity = res.data;
          console.log(this.cartWithQuantity);


        })
  }

  buyProducts() {
    this.cartService.orderFromCart()
      .subscribe(res => {
        if(res.status==true)
        {this.cart=[];
        this.cartWithQuantity=[];
        const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
        dialogRef.afterClosed()

      }

        else if(res.status==false)
        {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: res.message,
            panelClass: 'color'
          });
          dialogRef.afterClosed()

        }
        console.log(res);

      })


  }

  clearCart() {
    this.cartService.clearCart()
        .subscribe(res => {
          this.cart = []
          this.cartWithQuantity =[];

          const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
          dialogRef.afterClosed()

        });

  }

  calculatePrice() {
    return this.cartWithQuantity.totalAmount;

  }
  calculateQuantity() {
    return this.cartWithQuantity.totalQuantity;
  }

  removeItem(id: number) {
    this.cartService.removeItem(id)
        .subscribe(res => {

          this.cartWithQuantity=res.data;

          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === id) {
              this.cart.splice(i, 1);
            }
          }
          const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
          dialogRef.afterClosed()
        })


  }

  plusOne(id: number) {
    let model: AddToCart={
      id:id,
      quantity:1
    };




    this.cartService.addToCart(model).subscribe(res => {

      this.cartWithQuantity=res.data;

       this.getCart();
       const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
       dialogRef.afterClosed()
    })
  }



  minusOne(id: number) {
    this.cartService.minusQuantity(id).subscribe(res => {
      console.log(res);
      this.cartWithQuantity=res.data;

      this.getCart();
      const dialogRef = this.dialog.open(MessageDialogComponent, {data: res.message});
       dialogRef.afterClosed()
    })

  }
}


