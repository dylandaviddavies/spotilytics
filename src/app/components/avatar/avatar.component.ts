import { Component,  } from '@angular/core';
import {Select} from "@ngxs/store";
import {UserState} from "../../state";
import {Observable} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  @Select(UserState.getUser) user$!: Observable<User>;
}
