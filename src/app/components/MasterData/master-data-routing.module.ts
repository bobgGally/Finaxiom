import { UsersComponent } from './components/users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationGuard } from 'src/app/routing/navigation-guard.module';
import { GroupsComponent } from './components/groups/groups.component';
import { RolesComponent } from './components/roles/roles.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [NavigationGuard], data: { title: "User Management" } },
  { path: 'roles', component: RolesComponent, canActivate: [NavigationGuard], data: { title: "Role Management" } },
  { path: 'groups', component: GroupsComponent, canActivate: [NavigationGuard], data: { title: "Group Management" } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
