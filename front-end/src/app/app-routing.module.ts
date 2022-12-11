import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

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
      .then(m => m.ShopModule)
  },
  { path: 'product/:id', loadChildren: () => import('./pages/product-detail/product-detail.module')
      .then(m => m.ProductDetailModule) },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
