import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-signin-spotify',
  templateUrl: './signin-spotify.component.html',
  styleUrls: ['./signin-spotify.component.scss'],
})
export class SigninSpotifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.fragment
      .pipe(map((fragment) => new URLSearchParams(fragment)))
      .subscribe((fragment) => {
        this.authService.setToken({
          access_token: fragment.get('access_token'),
          token_type: fragment.get('token_type'),
          expires_in: parseInt(fragment.get('expires_in')),
          state: fragment.get('state'),
        });

        this.router.navigate(['/dashboard']);
      });
  }
}
