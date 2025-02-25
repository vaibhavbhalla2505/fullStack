import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { BookTableComponent } from './book-table/book-table.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'add-book', component: FormInputsComponent },
  {path:'book-details',component:BookTableComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
