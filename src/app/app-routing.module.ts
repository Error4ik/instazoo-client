import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {IndexComponent} from './layout/index/index.component';
import {AuthGuardService} from './helper/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
