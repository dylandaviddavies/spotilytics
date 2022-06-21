import {NgModule} from "@angular/core";
import {AvatarComponent} from "./avatar.component";
import {FeatherModule} from "angular-feather";
import {User} from "angular-feather/icons";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule, FeatherModule.pick({User})],
  exports: [AvatarComponent]
})
export class AvatarModule {

}
