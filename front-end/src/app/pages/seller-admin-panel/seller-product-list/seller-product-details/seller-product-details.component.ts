import {Component, OnInit} from '@angular/core';
import {SellerProductItemModel} from "../../models/seller-product-item.model";
import {ActivatedRoute, Params} from "@angular/router";
import {SellerProductStorageService} from "../../../../services/seller-product-storage.service";
import {Observable} from "rxjs";
import {ErrorDialogComponent} from "../../../../shared/error-handling/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-seller-product-details',
  templateUrl: './seller-product-details.component.html',
  styleUrls: ['./seller-product-details.component.scss']
})
export class SellerProductDetailsComponent implements OnInit {

product$!: Observable<SellerProductItemModel>

  constructor(
    private route: ActivatedRoute,
    private sellerProductStorageService: SellerProductStorageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe({
        next: (params: Params) => {
          this.product$ = this.sellerProductStorageService.getProductById(params['id'])
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: err,
            panelClass: 'color'
          });
          dialogRef.afterClosed()
        }
      })
  }

}
