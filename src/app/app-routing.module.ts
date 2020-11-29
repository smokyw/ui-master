import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { CreateOrJoinComponent } from './create-or-join/create-or-join.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'groups/:groupId', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'create-or-join', component: CreateOrJoinComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
