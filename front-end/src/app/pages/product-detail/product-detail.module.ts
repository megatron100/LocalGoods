import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductDetailComponent }]),
  ],
  providers: [],
})
export class ProductDetailModule {}
