import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ShopRoutingModule} from "./shop-routing.module";


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule {
}
