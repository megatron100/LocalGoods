import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SellerProductStorageService} from "../../../services/seller-product-storage.service";
import {Subscription} from "rxjs";
import {SellerProductItemModel} from "../models/seller-product-item.model";
import * as fromSellerProductList from '../../../store'
import {Store} from "@ngrx/store";
import {SellerProductState} from "../../../store/seller-product.reducer";
import {SellerService} from "../../../services/seller.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as ProductActions from "../../../store/seller-product.actions";
import {
  CreateSellerProductDialogComponent
} from "./dialogs/create-seller-product-dialog/create-seller-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss']
})
export class SellerProductListComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  products!: SellerProductItemModel[]
  displayedColumns: string[] = ['id', 'name', 'category',  'shortDesc', 'price', 'photo'];
  dataSource!: MatTableDataSource<SellerProductItemModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public sellerStorageService: SellerProductStorageService,
    public store: Store<fromSellerProductList.AppState>,
    public sellerService: SellerService,
    public sellerProductStorageService: SellerProductStorageService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
       this.sellerStorageService.getProducts()
      .subscribe({
        next: (res: SellerProductItemModel[]) => {
          this.sellerService.setProducts(res)
        }
      });

    this.subscription = this.store.select('sellerProductData')
      .subscribe((state: SellerProductState) => {
        this.products = state.sellerProducts;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onProductDelete(id: number) {
    console.log('id', id)
    this.sellerProductStorageService.deleteProduct(id.toString())
      .subscribe({
        next: (res: SellerProductItemModel[]) => {
          this.sellerService.setProducts(res)
        }
      })
  }

  onProductUpdate(product: SellerProductItemModel) {
    console.log('prod', product)
    this.store.dispatch(new ProductActions.ChangeMode(false));
    const dialogRef = this.dialog.open(CreateSellerProductDialogComponent, {data: product});
    dialogRef.afterClosed()
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
