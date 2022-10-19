import { ContactComponent } from './Pages/contact/contact.component';
import { AdvertisementComponent } from './Pages/advertisement/advertisement.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { PublishComponent } from './Pages/publish/publish/publish.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthGuardService } from './Guards/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:username', loadChildren: () => import(`./Pages/profile/profile.module`).then(m => m.ProfileModule),canActivate: [AuthGuardService] },
  {path: 'publish', component: PublishComponent, canActivate: [AuthGuardService]},
  {path: 'advertisement/:id', component: AdvertisementComponent, canActivate: [AuthGuardService]},
  {path: 'contact/:id', component: ContactComponent, canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
