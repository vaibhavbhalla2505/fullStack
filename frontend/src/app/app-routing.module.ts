import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { BookTableComponent } from './book-table/book-table.component';
import { LoginComponent } from './login/login.component';
import { MsalGuard } from '@azure/msal-angular';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  { path: 'add-book', component: FormInputsComponent,canActivate:[MsalGuard] },
  {path:'book-details',component:BookTableComponent,canActivate:[MsalGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
