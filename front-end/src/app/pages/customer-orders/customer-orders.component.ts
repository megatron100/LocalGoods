import { Component, OnInit } from '@angular/core';
import { CustomerOrderServiceService } from '../../services/CustomerOrderService/customer-order-service.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
})
export class CustomerOrdersComponent implements OnInit {
  orders: any;
  message = '';

  constructor(private orderServices: CustomerOrderServiceService) {}

  ngOnInit(): void {
    this.orderServices.getOrders().subscribe(({ data, message }) => {
      this.orders = data;
      this.message = message;
      console.log(data);
      console.log(message);
    });
  }
}
