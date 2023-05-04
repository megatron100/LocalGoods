import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ShopService } from 'src/app/services/shop.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
  ],
  providers: [ShopService],
})
export class HomeModule {}
