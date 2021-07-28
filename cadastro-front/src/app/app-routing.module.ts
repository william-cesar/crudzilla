import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './views/not-found/not-found.component';
import { HomeComponent } from './views/home/home.component';
import { MainComponent } from './views/main/main.component';
import { FormComponent } from './views/form/form.component';
import { ListComponent } from './views/list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'students',
    component: MainComponent,
    children: [
      { path: 'subscribe', component: FormComponent },
      { path: 'list', component: ListComponent },
      { path: 'edit/:id', component: FormComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
