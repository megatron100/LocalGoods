import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ]
})
export class HomeModule { }
