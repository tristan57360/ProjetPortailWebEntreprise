import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './pages/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserComponent } from './pages/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { UsersComponent } from './pages/users/users.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { environment } from '../environments/environment';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { ActualiteComponent } from './pages/actualite/actualite.component';
import { ActualiteNewComponent } from './pages/actualite-new/actualite-new.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { customClaims } from '@angular/fire/auth-guard';
import { AuthGuard } from './service/auth.guard';

const adminOnly = () => pipe(customClaims, map(claims => claims.role === 'admin'));
const employedOnly = () => pipe(customClaims, map(claims => claims.role === 'employed'));
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  { path: '',            component: LoginComponent }, // path: '/'
  { path: 'users',    component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'dashboard',    component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'actualites',    component: ActualitesComponent, canActivate: [AuthGuard] },
  { path: 'actualiteNew',    component: ActualiteNewComponent, canActivate: [AuthGuard],
  data: { roles: ['admin'] }},
  { path: '**',          redirectTo: '' },
  { path: 'login',          redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    UserComponent,
    DashboardComponent,
    UsersComponent,
    ActualitesComponent,
    ActualiteComponent,
    ActualiteNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatMenuModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase, 'portailweb'), // imports firebase/app needed for everything
    AngularFireAnalyticsModule, // dynamically imports firebase/analytics
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  exports: [
     AppComponent, AngularFireAuthGuardModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
