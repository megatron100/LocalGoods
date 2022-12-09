import {Component, Input, OnInit} from '@angular/core';
import {SellerProductItemModel} from "../../models/seller-product-item.model";
import {ActivatedRoute, Params} from "@angular/router";
import {SellerProductStorageService} from "../../../../services/seller-product-storage.service";

@Component({
  selector: 'app-seller-product-details',
  templateUrl: './seller-product-details.component.html',
  styleUrls: ['./seller-product-details.component.scss']
})
export class SellerProductDetailsComponent implements OnInit {

product!: SellerProductItemModel

  constructor(private route: ActivatedRoute, private sellerProductStorageService: SellerProductStorageService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.sellerProductStorageService.getProductById(params['id'])
          .subscribe({
            next: (res: SellerProductItemModel) => {
              this.product = res
            }
          })
      })
  }

}
