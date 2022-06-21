import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getUser(): Observable<User> {
    const { access_token, token_type } = this.authService.getToken();

    return this.httpClient
      .get<any>('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: token_type + ' ' + access_token,
        },
      })
      .pipe(
        catchError(() => {
          this.authService.authorize();
          return [];
        }),
        map((user) => ({
          name: user.display_name,
          avatarUrl: user.images?.[0].url,
        }))
      );
  }
}
