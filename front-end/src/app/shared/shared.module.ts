import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ErrorDialogComponent } from './error-handling/error-dialog/error-dialog.component';
import {PipesModule} from "./pipes";
import {DirectivesModule} from "./directives";
import {ComponentsModule} from "./components";

const exports = [PipesModule, DirectivesModule, ComponentsModule, ReactiveFormsModule, FormsModule]

@NgModule({
  declarations: [
    MessageDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    ...exports,
    CommonModule,
  ],
  exports: [
    exports,
  ],
  providers:[CdkColumnDef]
})
export class SharedModule { }
