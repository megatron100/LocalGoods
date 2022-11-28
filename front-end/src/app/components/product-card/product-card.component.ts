import { Component, OnInit } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../interfaces/product'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  filmIcon = faFilm;

  product: IProduct = {
    name: 'Lettuce',
    photo: '/assets/images/gen-lettuce.jpeg',
    price: 2.05,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius vestibulum mauris ac tempus.',
    seller: 'Lorem Ipsum'
  }

  constructor() { }

  ngOnInit(): void {
  }

  onClickAdd() {
    console.log('Added');
    
  }
}
