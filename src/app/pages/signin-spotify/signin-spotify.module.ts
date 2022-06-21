import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninSpotifyRoutingModule } from './signin-spotify-routing.module';
import {SigninSpotifyComponent} from "./signin-spotify.component";
import {SpinnerModule} from "../../components/spinner/spinner.module";


@NgModule({
  declarations: [SigninSpotifyComponent],
  imports: [
    CommonModule,
    SigninSpotifyRoutingModule,
    SpinnerModule
  ]
})
export class SigninSpotifyModule { }
