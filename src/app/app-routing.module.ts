import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { ViewPollComponent } from './components/view-poll/view-poll.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "create",
        pathMatch: "full"
      },
      {
        path: "create",
        component: CreateComponent
      },
      {
        path: "view",
        component: ViewPollComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
