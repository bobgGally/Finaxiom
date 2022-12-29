import { GlobalModule } from './../../global.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    
    this.global.setIsSignedIn(true)
    this.router.navigateByUrl('/home')
  }


}
