import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksPageComponent } from './tracks-page/tracks-page.component';
import {MapsModule} from "../../maps/map.module";
import {CoreModule} from "../../core/core.module";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {CardModule} from "../../card/card.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TrackFormComponent } from './track.form/track.form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {WidgetsModule} from "../../widgets/widgets.module";



@NgModule({
  declarations: [
    TracksPageComponent,
    TrackFormComponent
  ],
  imports: [
    CommonModule,
    MapsModule,
    CoreModule,
    MatInputModule,
    MatTableModule,
    CardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    WidgetsModule
  ],
  exports: [
    TracksPageComponent
  ]
})
export class TracksModule { }
