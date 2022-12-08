import {Component, Input, OnInit} from '@angular/core';
import {SellerProductItemModel} from "../../models/seller-product-item.model";

@Component({
  selector: 'app-seller-product-item',
  templateUrl: './seller-product-item.component.html',
  styleUrls: ['./seller-product-item.component.scss']
})
export class SellerProductItemComponent implements OnInit {

  @Input() index!: number
  sellerProduct: SellerProductItemModel = {
    name: 'Milk',
    photo: 'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2022/06/befunky-collage-2-1654780083.jpg',
    category: 'Milk products',
    price: 5.25,
    shortDesc: 'Tasty milk',
    longDescription: 'Super tasty milk rtlerk;tlkerto5k i ujviru veeior ioeyoei oirutoieurotieru oireuoit eiotue oirut eirtu er ijreijoirrjeoijocierijorijorifjorigjr'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
