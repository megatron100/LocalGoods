import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsRoutingModule} from "./settings-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { UserDataUpdateDialogComponent } from './user-data-update-dialog/user-data-update-dialog.component';



@NgModule({
  declarations: [
    UserDataUpdateDialogComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
