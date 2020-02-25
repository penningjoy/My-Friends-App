import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendDetailComponent } from './friend-detail/friend-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FriendDetailComponent },
  { path: 'friends', component: FriendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
