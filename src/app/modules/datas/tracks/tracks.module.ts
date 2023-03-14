import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksPageComponent } from './tracks-page/tracks-page.component';
import {MapsModule} from "../../maps/map.module";
import {CoreModule} from "../../core/core.module";



@NgModule({
  declarations: [
    TracksPageComponent
  ],
  imports: [
    CommonModule,
    MapsModule,
    CoreModule
  ],
  exports: [
    TracksPageComponent
  ]
})
export class TracksModule { }
