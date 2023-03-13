import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import {ThemeService} from "./theme.service";


@NgModule({
  declarations: [
    ThemeSwitchComponent
  ],
  exports: [
    ThemeSwitchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThemeModule { }
