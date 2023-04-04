import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TracksPageComponent} from "./tracks.page/tracks.page.component";
import {TrackPageComponent} from "./track.page/track.page.component";


const routes: Routes = [
  { path: '', component: TracksPageComponent},
  { path: '**', component: TrackPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule { }
