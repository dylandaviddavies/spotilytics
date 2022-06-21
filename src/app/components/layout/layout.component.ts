import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadUser } from '../../state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadUser());
  }
}
