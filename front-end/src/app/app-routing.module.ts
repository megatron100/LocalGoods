import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

import { OrdersConfirmComponent } from './orders-confirm/orders-confirm.component';
import { CustomerordersComponent } from './pages/customerorders/customerorders.component';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./pages/auth/login/login.module')
      .then(m => m.LoginModule)
  },
  {path: 'register', loadChildren: () => import('./pages/auth/register/register.module')
      .then(m => m.RegisterModule)
  },
  {path: 'home', loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule)
  },
  {path: 'info', loadChildren: () => import('./pages/info/info.module')
      .then(m => m.InfoModule)
  },
  {path: 'contacts', loadChildren: () => import('./pages/contacts/contacts.module')
      .then(m => m.ContactsModule)
  },
  {path: 'shop', loadChildren: () => import('./pages/shop/shop.module')
      .then(m => m.ShopModule), canActivate: [AuthGuard]
  },
  { path: 'product/:id', loadChildren: () => import('./pages/product-detail/product-detail.module')
      .then(m => m.ProductDetailModule),  canActivate: [AuthGuard] },
  {path: 'cart', loadChildren: () => import('./pages/cart/cart.module')
      .then(m => m.CartModule)
  },
  {
    path: 'seller-admin-panel', loadChildren: () => import('./pages/seller-admin-panel/seller-admin-panel.module')
      .then(m => m.SellerAdminPanelModule)
  },
  {
    path: 'private/settings', loadChildren: () => import('./pages/settings/settings.module')
      .then(m => m.SettingsModule)
  },
  {
    component:OrdersConfirmComponent,
    path:'sellerorders'
  },
  {
    component:CustomerordersComponent,
    path:'customerorders'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
