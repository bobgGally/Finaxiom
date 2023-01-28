import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from "@angular/material/snack-bar";
declare let cookieName: any;
export class GlobalConstants {
  public static apiURL: string = "https://itsolutionstuff.com/";
  serviceURL: string = "https://itsolutionstuff.com/";

  public static siteTitle: string = "This is example of ItSolutionStuff.com";

  protected isSignedOn: boolean = false;

  role: any = false;
  userDetails: any;
  accessToken = "";
  loaderName: any = 'primary'
  isHandset: any = false
  cookieName='FNTX'
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GlobalModule extends GlobalConstants {

  constructor(
    public cookieService: CookieService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    super()
  }

  setIsSignedIn(flag: boolean) {
    this.isSignedOn = flag;
  }

  getIsSignedIn() {
    return this.isSignedOn
  }

  snackBarAction(snackBarRef: any) {
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  showMessage(message: string, title?: string, duration = 4000) {
    let config: any = {
      panelClass: 'success'
    };
    if (duration)
      config["duration"] = duration
    // Simple message.
    let snackBarRef = this._snackBar.open(message, 'Dismiss', config);
    // this.toastr.show(message, title);
    this.snackBarAction(snackBarRef);
  }

  showError(message: string, title?: string, duration = 10000) {
    let config: any = {
      panelClass: 'error'
    };
    if (duration)
      config["duration"] = duration
    let snackBarRef = this._snackBar.open(message, 'Dismiss', config);
    // this.toastr.error(message, title);
    this.snackBarAction(snackBarRef);
  }

  showSuccess(message: string, title?: string, duration = 4000) {
    let config: any = {
      panelClass: 'success'
    };
    if (duration)
      config["duration"] = duration
    let snackBarRef = this._snackBar.open(message, 'Dismiss', config);
    // this.toastr.success(message, title);
    this.snackBarAction(snackBarRef);
  }

  showWarning(message: string, title?: string, duration = 4000) {
    let config: any = {
      panelClass: 'warning'
    };
    if (duration)
      config["duration"] = duration
    let snackBarRef = this._snackBar.open(message, 'Dismiss', config);
    // this.toastr.warning(message, title);
    this.snackBarAction(snackBarRef);
  }

  showInfo(message: string, title?: string, duration = 4000) {
    let config: any = {
      panelClass: 'info'
    };
    if (duration)
      config["duration"] = duration
    let snackBarRef = this._snackBar.open(message, 'Dismiss', config);
    this.snackBarAction(snackBarRef);
  }

  resetUserData() {
    this.cookieService.deleteAll('/');
    this.cookieService.delete(this.cookieName)
    this.isSignedOn = false;
    if (document.referrer !== "") {
      this.showInfo("Signed Out");
    }
    this.router.navigate(["/"]);
  }

  getOptions(flag = false) {
    var requestOptions: {
      headers: any
    } = {
      headers: ''
    }
    let headers = new HttpHeaders();

    if (flag)
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.set("Authorization", 'Bearer ' + this.accessToken);
    requestOptions.headers = headers;
    return requestOptions
  }

  cloneData(data: any) {
    return JSON.parse(JSON.stringify(data));
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}


