import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalModule } from 'src/app/shared/global.module';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menu = [];
  greet = "";
  isExpanded: boolean = true;
  notifications = []
  isDev = false;
  isUat = false;
  constructor(
    public global: GlobalModule,
    private dialog: MatDialog,
    private sharedService: SharedService,
  ) {

  }

  ngOnInit() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    if (hrs < 12)
      this.greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      this.greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      this.greet = 'Good Evening';
  }
  signout() {
    this.global.resetUserData();
  }

  toggleMenu() {
    this.sharedService.toggle();
    this.isExpanded = this.sharedService.sidenav.opened;
  }
}
