import { GlobalModule } from './shared/global.module';
import { Component } from '@angular/core';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _subscription: Subscription;
  get loggedIn() {
    return this.global.getIsSignedIn();
  };

  showFiller = false;
  menus = [
    { pagePath: '/home', iconClass: 'Home', displayName: 'Home' }
    , { pagePath: '/itr1', iconClass: 'Home', displayName: 'ITR 1' }
    , { pagePath: '/masters/users', iconClass: 'Home', displayName: 'Users' }
    , { pagePath: '/masters/roles', iconClass: 'Home', displayName: 'Role' }
    , { pagePath: '/masters/groups', iconClass: 'Home', displayName: 'Group' }
  ]

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(
    public global: GlobalModule,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private breakpointObserver: BreakpointObserver,
  ) {

    this._subscription = router.events.subscribe((event: any) => this.navigationInterceptor(event));

    this.breakpointObserver.observe(
      Breakpoints.Handset
    ).subscribe(result => {
      this.global.isHandset = result.matches;
    });

  }

  ngOnInit() {
    window.sessionStorage.clear();
    // this.dateAdapter.setLocale(navigator.language);
    var isCookie = this.cookieService.check(this.global.cookieName);
    var redirect = window.location.href.replace(location.origin, '').split('/?').join('?');
    if (isCookie) {
      this.global.setIsSignedIn(true);
      var cookieData = JSON.parse(this.cookieService.get(this.global.cookieName));
      this.global.accessToken = cookieData.token;
      this.global.userDetails = cookieData;
      if (redirect && redirect != '' && redirect != '/') {
        this.router.navigateByUrl(redirect)
        // this.sharedService.getMenu().subscribe()
        // if (r.length > 0) {
        //   this.router.navigate([r[0].pagePath])
        // }
      }
      // else
      //   this.sharedService.navigateDefault()
    } else {
      this.global.role = false;
      this.global.setIsSignedIn(false);
      var queryParam = {}
      if (redirect && redirect.indexOf('/signin') != -1) {

      }
      else if (redirect && redirect != '' && redirect != '/') {
        // if (redirect && redirect != '' && redirect != '/') {
        queryParam = { queryParams: { redirectTo: redirect } }
        this.router.navigate(["/default.aspx"], queryParam);
      }
      // this.router.navigate(["/default.aspx"], queryParam);
    }

  }



  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }


  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.dialog.closeAll()
      this.sharedService.spinner && this.sharedService.spinner.show()
    }

    if (event instanceof NavigationEnd) {
      this.sharedService.spinner.hide()
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.sharedService.spinner.hide()

    }

    if (event instanceof NavigationError) {
    }
  }

  loadSideNav(test: any) {
    this.sharedService.setSidenav(test);
  }

}
