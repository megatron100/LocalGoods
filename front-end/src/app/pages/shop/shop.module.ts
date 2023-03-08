import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ShopRoutingModule} from "./shop-routing.module";
import {ShopComponent} from "./shop.component";


@NgModule({
  declarations: [ShopComponent],
  imports: [
    SharedModule,
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule {
}
