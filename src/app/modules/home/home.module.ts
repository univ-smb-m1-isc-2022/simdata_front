import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
