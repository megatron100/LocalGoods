import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  CreateSellerProductDialogComponent
} from "./seller-product-list/dialogs/create-seller-product-dialog/create-seller-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import * as ProductActions from '../../store/seller-product.actions';
import * as fromSellerProductList from '../../store'
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-seller-admin-panel',
  templateUrl: './seller-admin-panel.component.html',
  styleUrls: ['./seller-admin-panel.component.scss']
})
export class SellerAdminPanelComponent implements OnInit {
 

  isCertificateExist: boolean = true

  constructor(private route: ActivatedRoute, private dialog: MatDialog, public store: Store<fromSellerProductList.AppState>) {
  }

  ngOnInit(): void {

  }

  onProductCreate() {
    this.store.dispatch(new ProductActions.ChangeMode(true));
    const dialogRef = this.dialog.open(CreateSellerProductDialogComponent);
    dialogRef.afterClosed()
  }
}
