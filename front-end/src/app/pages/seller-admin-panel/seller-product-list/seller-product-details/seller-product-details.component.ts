import {Component, OnInit} from '@angular/core';
import {SellerProductItemModel} from "../../models/seller-product-item.model";
import {ActivatedRoute, Params} from "@angular/router";
import {SellerProductStorageService} from "../../../../services/seller-product-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-seller-product-details',
  templateUrl: './seller-product-details.component.html',
  styleUrls: ['./seller-product-details.component.scss']
})
export class SellerProductDetailsComponent implements OnInit {

product$!: Observable<SellerProductItemModel>

  constructor(private route: ActivatedRoute, private sellerProductStorageService: SellerProductStorageService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.product$ = this.sellerProductStorageService.getProductById(params['id'])
      })
  }

}
