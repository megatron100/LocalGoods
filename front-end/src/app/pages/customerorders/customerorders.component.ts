import { Component, OnInit } from '@angular/core';
import { CustomerOrderServiceService } from 'src/app/services/CustomerOrderService/customer-order-service.service';

@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.scss']
})
export class CustomerordersComponent implements OnInit {
  Orders:any;


  constructor(private orders:CustomerOrderServiceService) { }

  ngOnInit(): void {
    this.orders.getorders().subscribe((result)=>{
      this.Orders=result;
      console.log(result)
    })
  }

}
