import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { User } from '../models/user';
import { Token } from '../models/token';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  private readonly token: BehaviorSubject<Token> = new BehaviorSubject(null);
  readonly token$: Observable<Token> = this.token.asObservable();

  private readonly user: BehaviorSubject<User> = new BehaviorSubject(null);
  readonly user$: Observable<User> = this.user.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initToken();

    this.token.subscribe((token) => {
      localStorage.setItem('token', JSON.stringify(token));
    });
  }

  login(): Observable<User> {
    return this.user$.pipe(
      concatMap((user) => {
        // if already logged in, return user
        if (user) return of(user);

        return this.token$.pipe(
          concatMap((token) => {
            if (!token) this.redirectToOauthLogin();

            const { access_token, token_type } = token;

            return this.httpClient
              .get<any>('https://api.spotify.com/v1/me', {
                headers: {
                  Authorization: token_type + ' ' + access_token,
                },
              })
              .pipe(
                catchError(() => {
                  this.redirectToOauthLogin();
                  return [];
                }),
                map((user) => ({
                  name: user.display_name,
                  avatarUrl: user.images?.[0].url,
                })),
                tap((user) => {
                  this.user.next(user);
                })
              );
          })
        );
      })
    );
  }

  updateToken(token: Token) {
    this.token.next(token);
  }

  private initToken() {
    const token = localStorage.getItem('token');
    if (!token) return;
    this.token.next(JSON.parse(token));
  }

  private redirectToOauthLogin() {
    window.location.href =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'token',
        client_id: environment.clientId,
        redirect_uri: environment.baseUrl + '/signin-spotify',
      }).toString();
  }
}
