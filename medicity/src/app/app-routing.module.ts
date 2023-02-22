import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { ChatComponent } from './user/chat/chat.component';
import { FavoritesComponent } from './user/favorites/favorites.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:AdminComponent},
  {path:'store',component:StoreComponent},
  {path:'user',component:UserComponent},
  {path:'user-profile',component:UserProfileComponent },
  {path:'user-favorites/:email',component:FavoritesComponent },
  {path:'chat',component:ChatComponent},
  {path:'admin',component:AdminComponent},
  {path:'admin-dash',component:DashboardComponent},
  {path:'edit-user/:id',component:EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
