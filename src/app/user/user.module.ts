import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { NavbarModule } from '../navbar/navbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class UserModule { }
