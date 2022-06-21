import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Token } from '../models/token';

@Injectable()
export class AuthService {
  private token?: Token;

  isAuthorized() {
    return !!this.getToken();
  }

  authorize() {
    window.location.href =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'token',
        client_id: environment.clientId,
        redirect_uri: environment.baseUrl + '/signin-spotify',
      }).toString();
  }

  setToken(token: Token) {
    localStorage.setItem('token', JSON.stringify(token));
    this.token = token;
  }

  getToken() {
    if (!this.token) {
      const token = localStorage.getItem('token');
      if (!token) return null;
      this.token = JSON.parse(localStorage.getItem('token'));
    }
    return this.token;
  }
}
