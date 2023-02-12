import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTracksComponent} from "./components/pages/page-tracks/page-tracks.component";
import { PageAuthentificationComponent} from "./components/pages/page-authentification/page-authentification.component";
import {AuthentificationGuard} from "./guards/authentification.guard";


const routes: Routes = [
  {
    path: 'tracks',
    component : PageTracksComponent,
    canActivate: [AuthentificationGuard]
  },
  {
    path: '',
    component : PageAuthentificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
