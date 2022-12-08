import {Component, Input, OnInit} from '@angular/core';
import {SellerProductItemModel} from "../../models/seller-product-item.model";

@Component({
  selector: 'app-seller-product-item',
  templateUrl: './seller-product-item.component.html',
  styleUrls: ['./seller-product-item.component.scss']
})
export class SellerProductItemComponent implements OnInit {

  @Input() sellerProduct!: SellerProductItemModel

  constructor() { }

  ngOnInit(): void {
  }

}
