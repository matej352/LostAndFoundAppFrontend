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

import { ProfileComponent } from './profile.component';
import { GeneralComponent } from './general/general.component';
import { ItemsComponent } from './items/items.component';



@NgModule({
  declarations: [
    ProfileComponent,
    GeneralComponent,
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
   


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

    
  ]
})
export class ProfileModule { }
