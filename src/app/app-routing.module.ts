import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard} from "./modules/auth/guards/auth.guard";

import { HomePageComponent} from "./modules/home/components/home-page/home-page.component";

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '', canActivate: [AuthGuard], children: [
      { path: '', component: HomePageComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
