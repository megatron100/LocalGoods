import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAdminPanelComponent } from './seller-admin-panel.component';
import {SellerAdminPanelRoutingModule} from './seller-admin-panel-routing.module';
import {SharedModule} from "../../shared/shared.module";
import { PrductListComponent } from './prduct-list/prduct-list.component';
import { SellerProductListComponent } from './seller-product-list/seller-product-list.component';
import { SellerProductItemComponent } from './seller-product-list/seller-product-item/seller-product-item.component';
import { SellerNewProductFormComponent } from './seller-new-product-form/seller-new-product-form.component';



@NgModule({
  declarations: [
    SellerAdminPanelComponent,
    PrductListComponent,
    SellerProductListComponent,
    SellerProductItemComponent,
    SellerNewProductFormComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SellerAdminPanelRoutingModule
  ]
})
export class SellerAdminPanelModule { }
