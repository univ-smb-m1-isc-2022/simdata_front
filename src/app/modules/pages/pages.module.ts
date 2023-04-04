import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesRoutingModule} from "./pages-routing.module";
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomePageComponent} from "./home-page/home-page.component";


@NgModule({
  declarations: [
    NotFoundComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class PagesModule { }
