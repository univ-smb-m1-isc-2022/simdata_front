import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location/location.component';
import {DatasModule} from "../../../datas.module";
@NgModule({
  declarations: [
    LocationComponent
  ],
  exports: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    DatasModule
  ]
})
export class LocationsModule { }
