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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
