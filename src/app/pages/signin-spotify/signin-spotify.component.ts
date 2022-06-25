import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin-spotify',
  templateUrl: './signin-spotify.component.html',
  styleUrls: ['./signin-spotify.component.scss'],
})
export class SigninSpotifyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.fragment
      .pipe(map((fragment) => new URLSearchParams(fragment)))
      .subscribe((fragment) => {
        this.userService.updateToken({
          access_token: fragment.get('access_token'),
          token_type: fragment.get('token_type'),
          expires_in: parseInt(fragment.get('expires_in')),
          state: fragment.get('state'),
        });

        this.router.navigate(['/dashboard']);
      });
  }
}
