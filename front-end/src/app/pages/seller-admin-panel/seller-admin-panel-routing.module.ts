import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerAdminPanelComponent } from './seller-admin-panel.component';
import { SellerProductDetailsComponent } from './seller-product-list/seller-product-details/seller-product-details.component';
import { SellerProductStartComponent } from './seller-product-list/seller-product-start/seller-product-start.component';
import { AuthGuard } from '../../core';
import { USER_ROLES } from '../../shared/constants/constants';

const routes: Routes = [
  {
    path: '',
    component: SellerAdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0],
    },
  },
  { path: ':id', component: SellerProductDetailsComponent },
  {
    path: '',
    component: SellerProductStartComponent,
    canActivate: [AuthGuard],
    data: {
      role: USER_ROLES[0],
    },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerAdminPanelRoutingModule {}
