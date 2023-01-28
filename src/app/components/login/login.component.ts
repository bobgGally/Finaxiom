import { GlobalModule } from '../../shared/global.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  user: SocialUser;
  loggedIn: boolean = false;
  public loginValid = true;
  public username = '';
  public password = '';
  constructor(
    private authService: SocialAuthService,
    private global: GlobalModule,
    private router: Router,
    public cookieService: CookieService
  ) {
    this.user = new SocialUser()
  }


  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  onSubmit() {
    this.global.userDetails = {
      firstName: 'John'
      , lastName: 'Doe'
      , displayName: 'John Doe'
      , userName: 'johndoe'
      , location: 'Chennai'
    };
    this.cookieService.set(this.global.cookieName, JSON.stringify(this.global.userDetails), 5, "/");
    this.global.setIsSignedIn(true)
    this.router.navigateByUrl('/home')
  }


}
