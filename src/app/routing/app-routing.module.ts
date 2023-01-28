import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import { Itr1Component } from '../components/module/itr1/itr1.component';


const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'itr1', component: Itr1Component },
   {
      path: 'masters',
      loadChildren: () => import('../components/MasterData/master-data.module').then(m => m.MasterDataModule),
      data: { title: "Masters" }
    },
  { path: '**', component:  LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )], exports: [RouterModule]
})
export class AppRoutingModule { }
