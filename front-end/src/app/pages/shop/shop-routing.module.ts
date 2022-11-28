import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./shop.component";
import {ProductCardComponent} from "../../components/product-card/product-card.component";

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
