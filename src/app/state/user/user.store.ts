import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { User } from '../../models/user';
import { LoadUser } from './user.actions';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';

export interface UserStateModel {
  user?: User;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  public static getUser(state: UserStateModel) {
    return state.user;
  }

  @Action(LoadUser)
  loadUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getUser().pipe(
      tap((user) => {
        ctx.patchState({
          user,
        });
      })
    );
  }
}
