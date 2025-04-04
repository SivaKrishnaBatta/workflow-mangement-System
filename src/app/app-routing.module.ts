import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';

import { CreateWorkflowComponent } from './create-workflow/create-workflow.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'workflows', component: WorkflowComponent },
  { path: 'create', component: CreateWorkflowComponent },
  { path: 'create/:id', component: CreateWorkflowComponent }, 
  {path: 'login', component: LoginPageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
