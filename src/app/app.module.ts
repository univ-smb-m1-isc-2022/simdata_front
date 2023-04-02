import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import {AuthModule} from "./modules/auth/auth.module";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ThemeModule} from "./modules/theme/theme.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CoreModule} from "./modules/core/core.module";
import {NavbarModule} from "./modules/navbar/navbar.module";
import {PagesModule} from "./modules/pages/pages.module";
import {DatasModule} from "./modules/datas/datas.module";
import {CardModule} from "./modules/card/card.module";
import {WidgetsModule} from "./modules/widgets/widgets.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ThemeModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    NavbarModule,
    PagesModule,
    DatasModule,
    CardModule,
    WidgetsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
