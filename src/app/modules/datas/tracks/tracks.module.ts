import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksPageComponent } from './tracks-page/tracks-page.component';
import {MapsModule} from "../../maps/map.module";
import {CoreModule} from "../../core/core.module";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {CardModule} from "../../widgets/card/card.module";



@NgModule({
  declarations: [
    TracksPageComponent
  ],
    imports: [
        CommonModule,
        MapsModule,
        CoreModule,
        MatInputModule,
        MatTableModule,
        CardModule
    ],
  exports: [
    TracksPageComponent
  ]
})
export class TracksModule { }
