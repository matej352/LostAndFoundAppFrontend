import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips'; 


import { ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';
import { GeneralComponent } from './general/general.component';
import { ItemsComponent } from './items/items.component';
import { MessagesComponent } from './messages/messages.component';
import { SidebarComponent } from './messages/sidebar/sidebar.component';
import { ChatComponent } from './messages/chat/chat.component';



@NgModule({
  declarations: [
    ProfileComponent,
    GeneralComponent,
    ItemsComponent,
    MessagesComponent,
    SidebarComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
   


    //Mat
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FontAwesomeModule,
    MatCardModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatChipsModule,


    
  ]
})
export class ProfileModule { }
