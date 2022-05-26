import { ManageItemsComponent } from './manage-items/manage-items.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { InactiveItemsComponent } from './inactive-items/inactive-items.component';
import { MessagesComponent } from './messages/messages.component';
import { ItemsComponent } from './items/items.component';
import { GeneralComponent } from './general/general.component';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from 'src/app/Guards/role-guard.service';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      {
        path: '', redirectTo: 'general', pathMatch: 'full'
      },
      
      {
        path: 'general', component: GeneralComponent
      },
      {
        path: 'items/lost', component: ItemsComponent
      },
      {
        path: 'items/found', component: ItemsComponent
      },
      {
        path: 'messages', component: MessagesComponent
      },
      {
        path: 'items/unactive', component: InactiveItemsComponent
      },
      {
        path: 'manage/accounts', component: ManageAccountsComponent, canActivate: [RoleGuardService]
      },
      {
        path: 'manage/items', component: ManageItemsComponent, canActivate: [RoleGuardService]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
