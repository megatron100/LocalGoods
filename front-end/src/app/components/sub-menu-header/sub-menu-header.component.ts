import { Component, OnInit } from '@angular/core';
import {PRODUCT_SORT_VALUES} from "../../constants/constants";

@Component({
  selector: 'app-sub-menu-header',
  templateUrl: './sub-menu-header.component.html',
  styleUrls: ['./sub-menu-header.component.scss']
})
export class SubMenuHeaderComponent implements OnInit {

  sortValues: string[] = PRODUCT_SORT_VALUES;

  constructor() { }

  ngOnInit(): void {
  }

  sortValueChange($event: any) {
    console.log($event.target.value)
  }

  searchChange($event: any) {
    console.log($event.target.value)
  }
}
