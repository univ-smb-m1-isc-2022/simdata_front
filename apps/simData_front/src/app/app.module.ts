import { NgModule } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/layouts/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


import { ThemeService } from './services/theme/theme.service';
import { ConnectionService} from "./services/connection/connection.service";
import { PageTracksComponent } from './components/pages/page-tracks/page-tracks.component';
import { PageAuthentificationComponent } from './components/pages/page-authentification/page-authentification.component';
import { PageComponent } from './components/pages/page/page.component';
import { LogoComponent } from './components/CORS/logo/logo.component';
import { DottedMapComponent } from './components/widgets/dotted-map/dotted-map.component';
import { HeaderComponent } from './components/layouts/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PageTracksComponent,
    PageAuthentificationComponent,
    PageComponent,
    LogoComponent,
    DottedMapComponent,
    HeaderComponent,
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
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    ThemeService,
    ConnectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
