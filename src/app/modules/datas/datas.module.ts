import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TracksModule} from "./tracks/tracks.module";
import {LayoutsModule} from "./layouts/layouts.module";



@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    TracksModule,
    LayoutsModule
  ]
})
export class DatasModule { }
