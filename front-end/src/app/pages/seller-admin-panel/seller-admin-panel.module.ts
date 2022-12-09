import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerAdminPanelComponent } from './seller-admin-panel.component';
import {SellerAdminPanelRoutingModule} from './seller-admin-panel-routing.module';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    SellerAdminPanelComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SellerAdminPanelRoutingModule
  ]
})
export class SellerAdminPanelModule { }
