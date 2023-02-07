import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'user', component: TabsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
