import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ShopComponent} from "./shop.component";
import {AuthGuard} from "../auth/auth.guard";
import {USER_ROLES} from "../../constants/constants";

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[1]
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
export class ShopRoutingModule {
}
