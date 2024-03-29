import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {TracksPageComponent} from "../datas/tracks/tracks.page/tracks.page.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {TrackPageComponent} from "../datas/tracks/track.page/track.page.component";


const routes: Routes = [

  { path: 'home', component: HomePageComponent},
  { path: 'tracks', loadChildren: () => import('../datas/tracks/tracks.module').then(m => m.TracksModule) },
  /*{ path: 'tracks/:name', component: TrackPageComponent},
  { path: 'tracks', component: TracksPageComponent},*/
  //else redirect to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
