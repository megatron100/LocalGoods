import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SellerService } from '../../services/seller.service';
import { MessageDialogComponent } from '../../shared/dialogs/message-dialog/message-dialog.component';
import { Order } from '../../core';

@Component({
  selector: 'app-orders-confirm',
  templateUrl: './orders-confirm.component.html',
  styleUrls: ['./orders-confirm.component.scss'],
})
export class OrdersConfirmComponent implements OnInit {
  pending_orders!: Order[] | undefined;

  constructor(public sellerService: SellerService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.sellerService.getOrders().subscribe(({ data }) => {
      this.pending_orders = data;
    });
  }

  declineOrder(id: number) {
    this.sellerService.declineOrder(id).subscribe((result) => {
      this.getOrders();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: result.message,
      });
      dialogRef.afterClosed();
    });
  }

  deliverOrder(id: number) {
    this.sellerService.deliverOrder(id).subscribe((result) => {
      this.getOrders();
      const dialogRef = this.dialog.open(MessageDialogComponent, {
        data: result.message,
      });
      dialogRef.afterClosed();
    });
  }
}
