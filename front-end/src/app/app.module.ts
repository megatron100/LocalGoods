import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './components/footer/footer.component';
import {SharedModule} from "./shared/shared.module";
import {HomeComponent} from './pages/home/home.component';
import {InfoComponent} from './pages/info/info.component';
import {ShopComponent} from './pages/shop/shop.component';
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {SubMenuHeaderComponent} from './components/sub-menu-header/sub-menu-header.component';
import {StoreModule} from "@ngrx/store";
import {reducers} from "./pages/store";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InfoComponent,
    ShopComponent,
    ProductCardComponent,
    SubMenuHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
