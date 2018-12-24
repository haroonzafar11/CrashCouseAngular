import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginWrapperComponent } from './login-wrapper/login-wrapper.component';
import { Auth } from './auth.service'
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserApiDataComponent } from './user-api-data/user-api-data.component';
const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'app-login-wrapper',
    component: LoginWrapperComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'home', 
  component: HomeComponent,
  children:[{path:'user-details',component: UserDetailsComponent},
  {path:'user-api-data/:id',component: UserApiDataComponent}],
  canActivate: [Auth] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }