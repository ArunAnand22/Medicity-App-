import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StoreComponent } from './store/store.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './UserSide/header/header.component';
import { FooterComponent } from './UserSide/footer/footer.component';
import { FilterPipe } from './user/pipes/filter.pipe';
import { ChatComponent } from './user/chat/chat.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FavoritesComponent } from './user/favorites/favorites.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StoreComponent,
    UserComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    ChatComponent,
    DashboardComponent,
    AdminHeaderComponent,
    UserProfileComponent,
    FavoritesComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
