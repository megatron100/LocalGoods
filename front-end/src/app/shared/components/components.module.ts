import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {SubMenuHeaderComponent} from "./sub-menu-header/sub-menu-header.component";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    SubMenuHeaderComponent,
    LoadingSpinnerComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLinkActive,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    SubMenuHeaderComponent,
    LoadingSpinnerComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ComponentsModule {}
