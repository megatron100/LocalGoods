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
import {SearchPipe} from "../pipes/search.pipe";
import {SortPipe} from "../pipes/sort.pipe";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog'


@NgModule({
  declarations: [
    SearchPipe,
    SortPipe,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule
  ],
  exports: [
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    SearchPipe,
    SortPipe,
  ],
  providers:[CdkColumnDef]
})
export class SharedModule { }
