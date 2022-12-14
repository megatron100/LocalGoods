import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
 
@Component({
  selector: 'app-orders-confirm',
  templateUrl: './orders-confirm.component.html',
  styleUrls: ['./orders-confirm.component.scss']
})
export class OrdersConfirmComponent implements OnInit {
  pending_orders!:any;

  constructor(public sellerService: SellerService ) { 
    
  }
  ngOnInit(): void {
    this.sellerService.getorders().subscribe((result)=>{this.pending_orders=result.data;console.log(this.pending_orders)
    });
    
  }
  declineOrder(id:any){
    this.sellerService.declineOrder(id).subscribe((result)=>{console.log(result)
    });
  }

  deliverOrder(id:any)
  {
    this.sellerService.deliverOrder(id).subscribe((result)=>{console.log(result)})

  }

}
