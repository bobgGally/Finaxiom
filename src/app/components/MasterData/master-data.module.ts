import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataRoutingModule } from './master-data-routing.module';
import { GroupsComponent } from './components/groups/groups.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    GroupsComponent,
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class MasterDataModule { }
