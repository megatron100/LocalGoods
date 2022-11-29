import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {IProduct} from "../../interfaces/product";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[] = []

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.products = this.shopService.products
  }

}
