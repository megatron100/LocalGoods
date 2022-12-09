import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth.guard";
import {USER_ROLES} from "../../constants/constants";
import {SellerAdminPanelComponent} from "./seller-admin-panel.component";

const routes: Routes = [
  {
    path: '',
    component: SellerAdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0]
    }
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
