import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/CORS/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";

import { ThemeService } from './services/theme/theme.service';
import { PageTracksComponent } from './components/pages/page-tracks/page-tracks.component';
import { PageAuthentificationComponent } from './components/pages/page-authentification/page-authentification.component';
import { PageComponent } from './components/pages/page/page.component';
import { LogoComponent} from "./components/CORS/logo/logo.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageTracksComponent,
    PageAuthentificationComponent,
    PageComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
