import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserDataUpdateDialogComponent } from './user-data-update-dialog/user-data-update-dialog.component';
import { BasicInfoComponent } from './user-data-update-dialog/basic-info/basic-info.component';
import { AddressComponent } from './user-data-update-dialog/address/address.component';
import { UserUpdatePassDialogComponent } from './user-update-pass-dialog/user-update-pass-dialog.component';
import { AddCertificateDialogComponent } from './add-certificate-dialog/add-certificate-dialog.component';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [
    UserDataUpdateDialogComponent,
    BasicInfoComponent,
    AddressComponent,
    UserUpdatePassDialogComponent,
    AddCertificateDialogComponent,
    SettingsComponent,
  ],
  imports: [SharedModule, CommonModule, SettingsRoutingModule],
})
export class SettingsModule {}
