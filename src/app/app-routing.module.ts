import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { CreateformComponent }      from './createform/createform.component';
import { LookupformComponent }      from './lookupform/lookupform.component';

const routes: Routes = [
  {path: 'register' ,               component:CreateformComponent},
  {path: 'login' ,                  component:LookupformComponent},
  {path: '**' ,                     redirectTo: 'register' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


