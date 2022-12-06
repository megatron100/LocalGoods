import {RouterModule, Routes} from "@angular/router";
import {SettingsComponent} from "./settings.component";
import {AuthGuard} from "../auth/auth.guard";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SettingsRoutingModule {

}
