import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyErrorStateMatcherDirective} from "./my-error-state-matcher.directive";

@NgModule({
  declarations: [MyErrorStateMatcherDirective],
  imports: [CommonModule],
  exports: [MyErrorStateMatcherDirective]
})
export class DirectivesModule {}
