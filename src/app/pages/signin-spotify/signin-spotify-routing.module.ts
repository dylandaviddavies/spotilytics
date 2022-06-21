import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninSpotifyComponent} from "./signin-spotify.component";

const routes: Routes = [{path: '', component: SigninSpotifyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninSpotifyRoutingModule { }
