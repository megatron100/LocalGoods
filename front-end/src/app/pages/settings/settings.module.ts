import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
