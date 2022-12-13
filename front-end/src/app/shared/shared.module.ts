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
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card'
import {MyErrorStateMatcherDirective} from '../directives/my-error-state-matcher.directive';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ErrorDialogComponent } from './error-handling/error-dialog/error-dialog.component';


@NgModule({
  declarations: [
    SearchPipe,
    SortPipe,
    LoadingSpinnerComponent,
    MyErrorStateMatcherDirective,
    MessageDialogComponent,
    ErrorDialogComponent
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
    MatDialogModule,
    MatCardModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
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
    MatCardModule,
    MyErrorStateMatcherDirective,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers:[CdkColumnDef]
})
export class SharedModule { }
