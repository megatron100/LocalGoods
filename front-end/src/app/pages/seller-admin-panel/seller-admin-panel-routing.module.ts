import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {USER_ROLES} from "../../constants/constants";
import {SellerAdminPanelComponent} from "./seller-admin-panel.component";
import {SellerNewProductFormComponent} from "./seller-new-product-form/seller-new-product-form.component";

const routes: Routes = [
  {
    path: '',
    component: SellerAdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0]
    },
    children: [
      {path: 'new', component: SellerNewProductFormComponent},
      {path: 'new', component: SellerNewProductFormComponent},
    ]
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
