import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTracksComponent } from './components/pages/page-tracks/page-tracks.component';
import { PageAuthentificationComponent } from './components/pages/page-authentification/page-authentification.component';

const routes: Routes = [
  {
    path: 'tracks',
    component: PageTracksComponent,
  },
  {
    path: 'login',
    component: PageAuthentificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
