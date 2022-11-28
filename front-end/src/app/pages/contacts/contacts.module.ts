import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([{path: '', component: ContactsComponent}])
  ]
})
export class ContactsModule { }
