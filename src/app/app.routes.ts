import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './NotFoundPage/notfound.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { RedirectGuard } from './RouterGuard/redirect-router-guard';
import { UserLoginGuard } from './RouterGuard/user-login-guard';
import { LoadTabelComponent } from './load-tabel/load-tabel.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'fetchDetail', component: HomeComponent, canActivate: [UserLoginGuard] },
    { path: 'contactMe', component: ContactDetailsComponent, canActivate: [RedirectGuard] },
    { path: 'loadTabel', component: LoadTabelComponent },
    { path: '**', component: NotFoundComponent, canActivate: [RedirectGuard] }
];