import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent} from "./components/logo/logo.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    LogoComponent
    ]
})
export class CoreModule { }
