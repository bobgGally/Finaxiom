import { GlobalModule } from './global.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get loggedIn() {
    return this.global.getIsSignedIn();
  };
  showFiller = false;
  menus = [
    { pagePath: '/home', iconClass: 'Home', displayName: 'Home' },
    { pagePath: '/itr1', iconClass: 'Home', displayName: 'ITR 1' }
  ]
  constructor(private global: GlobalModule) {

  }
}
