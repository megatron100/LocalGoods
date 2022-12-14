import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: CartComponent}])
  ]
})
export class CartModule {
}
