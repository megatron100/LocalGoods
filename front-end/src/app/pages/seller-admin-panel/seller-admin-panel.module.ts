import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAdminPanelComponent } from './seller-admin-panel.component';
import {SellerAdminPanelRoutingModule} from './seller-admin-panel-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { SellerProductItemComponent } from './seller-product-list/seller-product-item/seller-product-item.component';
import { SellerProductDetailsComponent } from './seller-product-list/seller-product-details/seller-product-details.component';
import { SellerProductStartComponent } from './seller-product-list/seller-product-start/seller-product-start.component';



@NgModule({
  declarations: [
    SellerAdminPanelComponent,
    SellerProductListComponent,
    SellerProductItemComponent,
    SellerProductDetailsComponent,
    SellerProductStartComponent
  ],
    imports: [
        SharedModule,
        CommonModule,
        SellerAdminPanelRoutingModule,
    ]
})
export class SellerAdminPanelModule { }
