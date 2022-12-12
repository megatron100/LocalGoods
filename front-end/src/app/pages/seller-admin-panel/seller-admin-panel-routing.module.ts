import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {USER_ROLES} from "../../constants/constants";
import {SellerAdminPanelComponent} from "./seller-admin-panel.component";
import {
  SellerProductDetailsComponent
} from "./seller-product-list/seller-product-details/seller-product-details.component";
import {SellerProductStartComponent} from "./seller-product-list/seller-product-start/seller-product-start.component";

const routes: Routes = [
  {
    path: '',
    component: SellerAdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0]
    },
    children: [{path: ':id', component: SellerProductDetailsComponent},]
  },
  {
    path: '',
    component: SellerProductStartComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0]
    },
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
export class SellerAdminPanelRoutingModule {
}
