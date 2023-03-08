import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {OrdersConfirmComponent} from "./orders-confirm.component";



@NgModule({
  declarations: [OrdersConfirmComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: OrdersConfirmComponent}])
  ]
})
export class OrdersConfirmModule { }
