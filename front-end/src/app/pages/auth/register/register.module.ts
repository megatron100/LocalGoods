import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from "./register.component";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: RegisterComponent}])
  ]
})
export class RegisterModule {
}
