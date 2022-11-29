import {Component, Input, OnInit} from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../interfaces/product'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  filmIcon = faFilm;

  products: IProduct[] = [];
  @Input() product!: IProduct;

  constructor() { }

  ngOnInit(): void {

  }

  onClickAdd() {
    console.log('Added');

  }
}
