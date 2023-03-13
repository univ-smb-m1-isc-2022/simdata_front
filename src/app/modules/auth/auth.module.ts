import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AuthPageComponent } from './components/auth-page/auth-page.component';



@NgModule({
  declarations: [
    AuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AuthPageComponent}
    ])
  ]
})
export class AuthModule { }
