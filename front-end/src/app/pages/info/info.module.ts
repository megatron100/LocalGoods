import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { InfoComponent } from './info.component';

@NgModule({
  declarations: [InfoComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: InfoComponent }]),
  ],
})
export class InfoModule {}
