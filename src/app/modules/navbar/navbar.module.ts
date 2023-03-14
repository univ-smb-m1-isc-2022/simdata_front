import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import {CoreModule} from "../core/core.module";
import {RouterLinkWithHref} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterLinkWithHref,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
