import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatChipsModule} from '@angular/material/chips'; 
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';


import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavigationComponent } from './Shared/navigation/navigation.component';
import { HomeComponent } from './Pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './Pages/profile/profile.component';
import { AdvertisementListComponent } from './Pages/home/advertisement-list/advertisement-list.component';
import { PublishComponent } from './Pages/publish/publish/publish.component';
import { CategoryListComponent } from './Pages/home/category-list/category-list.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { PublishFormComponent } from './Pages/publish/publish/publish-form/publish-form.component';
import { FormComponent } from './Pages/login/form/form.component';
import { FormsModule } from '@angular/forms';


export function getToken() {
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    ProfileComponent,
    AdvertisementListComponent,
    PublishComponent,
    CategoryListComponent,
    NotFoundComponent,
    PublishFormComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    //Mat
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatExpansionModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({     
      config: { 
        tokenGetter : getToken,
        allowedDomains : ["https://localhost:44326"],  
        disallowedRoutes: []

      }

    }),
    BrowserAnimationsModule
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
