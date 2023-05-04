import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAdminPanelComponent } from './seller-admin-panel.component';
import { SellerAdminPanelRoutingModule } from './seller-admin-panel-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { SellerProductItemComponent } from './seller-product-list/seller-product-item/seller-product-item.component';
import { SellerProductDetailsComponent } from './seller-product-list/seller-product-details/seller-product-details.component';
import { SellerProductStartComponent } from './seller-product-list/seller-product-start/seller-product-start.component';
import { CreateSellerProductDialogComponent } from './seller-product-list/dialogs/create-seller-product-dialog/create-seller-product-dialog.component';

@NgModule({
  declarations: [
    SellerAdminPanelComponent,
    SellerProductListComponent,
    SellerProductItemComponent,
    SellerProductDetailsComponent,
    SellerProductStartComponent,
    CreateSellerProductDialogComponent,
  ],
  imports: [SharedModule, CommonModule, SellerAdminPanelRoutingModule],
})
export class SellerAdminPanelModule {}
