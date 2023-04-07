import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterCategoryPipe } from './filter-category.pipe';
import { SearchPipe } from './search.pipe';
import { SortPipe } from './sort.pipe';
import { PaginationPipe } from './pagination.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    FilterCategoryPipe,
    SearchPipe,
    SortPipe,
    PaginationPipe,
  ],
  imports: [CommonModule],
  exports: [
    FilterPipe,
    FilterCategoryPipe,
    SearchPipe,
    SortPipe,
    PaginationPipe,
  ],
})
export class PipesModule {}
