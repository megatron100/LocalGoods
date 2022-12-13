import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-admin-panel',
  templateUrl: './seller-admin-panel.component.html',
  styleUrls: ['./seller-admin-panel.component.scss']
})
export class SellerAdminPanelComponent implements OnInit {
isCertificateExist!: boolean;

  constructor() { }

  ngOnInit(): void {
  }


  onProductCreate() {

  }
}
