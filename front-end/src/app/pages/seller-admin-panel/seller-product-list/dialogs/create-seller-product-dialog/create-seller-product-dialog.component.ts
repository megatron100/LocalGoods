import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import * as fromSellerProductList from '../../../../../store'
import * as ProductActions from '../../../../../store/seller-product.actions'
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {SellerProductState} from "../../../../../store/seller-product.reducer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SellerProductStorageService} from "../../../../../services/seller-product-storage.service";
import {CategoryModel} from "../../../models/category.model";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SellerService} from "../../../../../services/seller.service";
import {SellerProductItemModel} from "../../../models/seller-product-item.model";
import {ErrorDialogComponent} from "../../../../../shared/error-handling/error-dialog/error-dialog.component";

@Component({
  selector: 'app-create-seller-product-dialog',
  templateUrl: './create-seller-product-dialog.component.html',
  styleUrls: ['./create-seller-product-dialog.component.scss']
})
export class CreateSellerProductDialogComponent implements OnInit, OnDestroy {

  private productsSubscription!: Subscription;
  isCreateMode!: boolean;
  createProductForm!: FormGroup;
  categories!: CategoryModel[];
  selectedValue!: string;


  constructor(
    public store: Store<fromSellerProductList.AppState>,
    public sellerService: SellerService,
    public sellerProductStorageService: SellerProductStorageService,
    @Inject(MAT_DIALOG_DATA) public data: SellerProductItemModel,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.isCreateMode) {
      this.createProductForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        photo: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        shortDesc: new FormControl(null, [Validators.required]),
        longDescription: new FormControl(null, [Validators.required]),
      })
    }
    this.createProductForm = new FormGroup({
      name: new FormControl(this.data?.name, [Validators.required]),
      photo: new FormControl(this.data?.photo, [Validators.required]),
      category: new FormControl(this.data?.category, [Validators.required]),
      price: new FormControl(this.data?.price, [Validators.required]),
      shortDesc: new FormControl(this.data?.shortDesc, [Validators.required]),
      longDescription: new FormControl(this.data?.longDescription, [Validators.required]),
    })
    this.sellerProductStorageService.getCategories()
      .subscribe({
        next: ({data}) => {
          this.categories = [...data as CategoryModel[]]
          this.store.dispatch(new ProductActions.GetCategories(data))
        },
        error: err => {
          const dialogRef = this.dialog.open(ErrorDialogComponent, {data: err});
          dialogRef.afterClosed()
        }
      })

    this.productsSubscription = this.store.select('sellerProductData')
      .subscribe({
        next: (state: SellerProductState) => {
          this.isCreateMode = state.isCreateMode;
          this.categories = [...state.categoryList];
        }
      })
  }

  onSubmit() {
    if (this.isCreateMode) {
      this.sellerProductStorageService.storeProduct(this.createProductForm.value)
        .subscribe({
          next: (res: SellerProductItemModel[]) => {
            this.sellerService.setProducts(res)
          },
          error: err => {
            const dialogRef = this.dialog.open(ErrorDialogComponent, {
              data: err,
              panelClass: 'color'
            });
            dialogRef.afterClosed()
          }
        })
    } else {
      this.sellerProductStorageService.updateProduct(this.data.id.toString(), this.createProductForm.value)
        .subscribe({
          next: (res: SellerProductItemModel[]) => {
            this.sellerService.setProducts(res)
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

  ngOnDestroy() {
    this.productsSubscription.unsubscribe()
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files
    console.log(file)
    this.createProductForm.patchValue({
      photo: file
    })
  }
}
