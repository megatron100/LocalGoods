import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterPipe} from "./filter.pipe";
import {FilterCategoryPipe} from "./filter-category.pipe";
import {SearchPipe} from "./search.pipe";
import {SortPipe} from "./sort.pipe";

@NgModule({
  declarations: [FilterPipe, FilterCategoryPipe, SearchPipe, SortPipe],
  imports: [CommonModule],
  exports: [FilterPipe, FilterCategoryPipe, SearchPipe, SortPipe]
})
export class PipesModule {}
