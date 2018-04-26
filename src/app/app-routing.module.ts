import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: ':owner/:repository', component: RepositoryComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }
