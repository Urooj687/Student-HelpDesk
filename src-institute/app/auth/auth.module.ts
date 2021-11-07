import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { UserService } from './user.service';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [],
  providers: [UserService]
})
export class AuthModule { }
