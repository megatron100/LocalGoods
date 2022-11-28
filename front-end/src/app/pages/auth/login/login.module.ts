import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: LoginComponent}])
  ]
})
export class LoginModule { }
