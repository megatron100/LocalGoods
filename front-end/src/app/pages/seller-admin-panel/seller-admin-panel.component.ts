import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-seller-admin-panel',
  templateUrl: './seller-admin-panel.component.html',
  styleUrls: ['./seller-admin-panel.component.scss']
})
export class SellerAdminPanelComponent implements OnInit {

  isCertificateExist: boolean = true

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

  }

  onProductCreate() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
