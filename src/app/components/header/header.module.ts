import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {AvatarModule} from "../avatar/avatar.module";
import {LogoModule} from "../logo/logo.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,AvatarModule, LogoModule],
  exports: [HeaderComponent]
})
export class HeaderModule {

}
