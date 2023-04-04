import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data/data.component';



@NgModule({
  declarations: [
    DataComponent
  ],
  exports: [
    DataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DatasModule { }
