import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { GlobalModule } from '../shared/global.module';

@Injectable()
export class NavigationGuard implements CanActivate {
  constructor(private globals: GlobalModule,) { }
  checkProcessDesignerTypes: any = ["groups", "processitems", "workflow", "processdetails", "emails", "variables", "rules"]
  canActivate(
    route: ActivatedRouteSnapshot): boolean {
    return true;
  }
}



