import {Component, OnDestroy, OnInit} from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public topProds!: any[];
  private userSub!: Subscription;
  user!: User;

  constructor( public shopService: ShopService, public authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(user => {
        if (user) {
          this.user = user
        }
      });
    this.getTopProds();
  }

  getTopProds() {
    let dataCont: any[];
    this.shopService.getProducts()
        .subscribe(res => {
          dataCont = res.data.otherProducts;
          dataCont.sort(function(a, b) {
            return parseFloat(b.seller.sellerRating) - parseFloat(a.seller.sellerRating);
        });
        this.topProds = dataCont.splice(0, 3);
        })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
