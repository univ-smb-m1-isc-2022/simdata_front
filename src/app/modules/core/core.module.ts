import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent} from "./components/logo/logo.component";
import {HttpClientModule} from "@angular/common/http";
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    LogoComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
    exports: [
        LogoComponent,
        CardComponent
    ]
})
export class CoreModule { }
