import { Component, Input, OnInit } from '@angular/core';
import { AddToCart } from 'src/app/interfaces/addToCartModel';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart!: any[];
  cartWithQuantity: any;

  constructor( private cartService: CartService ) { }

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
        if(res.data.status==true)
        {this.cart=[];
        this.cartWithQuantity=[];}
        console.log(res);
        
      })

    
  }

  clearCart() {
    this.cartService.clearCart()
        .subscribe(res => {
          this.cart = []
          this.cartWithQuantity =[];
          console.log(res);
          
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
          console.log(res);
          this.cartWithQuantity=res.data;
          
          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].id === id) {
              this.cart.splice(i, 1);
            }
          }
        })
    
    
  }

  plusOne(id: number) {
    let model: AddToCart={
      id:id,
      quantity:1
    };
     

    

    this.cartService.addToCart(model).subscribe(res => {
      console.log(res);
      this.cartWithQuantity=res.data;
      
       this.getCart();
    })
  }
    
 

  minusOne(id: number) {
    this.cartService.minusQuantity(id).subscribe(res => {
      console.log(res);
      this.cartWithQuantity=res.data;
      
      this.getCart();
    })
     
  }
}

 
