import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Auth } from './auth.service'
import { jwt } from './jwt'
import {HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginWrapperComponent } from './login-wrapper/login-wrapper.component';
import { UserApiDataComponent } from './user-api-data/user-api-data.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
    CreateUserComponent,
    AlertComponent,
    LoginComponent,
    HomeComponent,
    UserDetailsComponent,
    LoginWrapperComponent,
    UserApiDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  providers: [Auth,
    { provide: HTTP_INTERCEPTORS, useClass: jwt, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
