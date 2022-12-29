import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export class GlobalConstants {
  public static apiURL: string = "https://itsolutionstuff.com/";

  public static siteTitle: string = "This is example of ItSolutionStuff.com";

  protected isSignedOn: boolean = true;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GlobalModule extends GlobalConstants {

  constructor() {
    super()
  }

  setIsSignedIn(flag: boolean) {
    this.isSignedOn = flag;
  }

  getIsSignedIn() {
    return this.isSignedOn
  }
}


