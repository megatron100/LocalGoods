import { Component, OnInit } from '@angular/core';
import { CustomerOrderServiceService } from 'src/app/services/CustomerOrderService/customer-order-service.service';

@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.scss']
})
export class CustomerordersComponent implements OnInit {
  orders:any;
  message: string = ''


  constructor(private orderServices:CustomerOrderServiceService) { }

  ngOnInit(): void {
    this.orderServices.getOrders().subscribe(({data, message})=>{
      this.orders=data;
      this.message=message;
      console.log(data)
      console.log(message)
    })
  }

}
