import { MessagesComponent } from './messages/messages.component';
import { ItemsComponent } from './items/items.component';
import { GeneralComponent } from './general/general.component';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
