import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {SellerService} from "../../services/seller.service";
import {MessageDialogComponent} from "../../shared/dialogs/message-dialog/message-dialog.component";

@Component({
  selector: 'app-orders-confirm',
  templateUrl: './orders-confirm.component.html',
  styleUrls: ['./orders-confirm.component.scss']
})
export class OrdersConfirmComponent implements OnInit {
  pending_orders!:any;

  constructor(public sellerService: SellerService, public dialog: MatDialog ) {

  }
  ngOnInit(): void {
    this.getOrders();

  }
  getOrders(){
    this.sellerService.getorders().subscribe((result)=>{this.pending_orders=result.data;})

  }
  declineOrder(id:any){
    this.sellerService.declineOrder(id).subscribe((result)=>{
      this.getOrders();
      const dialogRef = this.dialog.open(MessageDialogComponent, {data: result.message});
       dialogRef.afterClosed()

    });
  }

  deliverOrder(id:any)
  {
    this.sellerService.deliverOrder(id).subscribe((result)=>{

      this.getOrders()
      const dialogRef = this.dialog.open(MessageDialogComponent, {data: result.message});
       dialogRef.afterClosed()
    } )


  }

}
