import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapsed: boolean = true;
  isUserAuth: boolean = true;
  cart!: IProduct[];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.cartContent;
  }

  onLogout() {

  }
}
