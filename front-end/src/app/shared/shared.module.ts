import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { ErrorDialogComponent } from './error-handling/error-dialog/error-dialog.component';
import { PipesModule } from './pipes';
import { DirectivesModule } from './directives';
import { ComponentsModule } from './components';

const exports = [PipesModule, DirectivesModule, ComponentsModule];

@NgModule({
  declarations: [MessageDialogComponent, ErrorDialogComponent],
  imports: [...exports, CommonModule],
  exports: [exports],
  providers: [CdkColumnDef],
})
export class SharedModule {}
