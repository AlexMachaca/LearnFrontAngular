import { Routes } from '@angular/router';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { ListDataComponent } from './list-data/list-data.component';
import { PersonInsertComponent } from './page/person/insert/insert.component';
import { PersonGetAllComponent } from './page/person/get-all/get-all.component';
import { OfficeInsertComponent } from './page/Office/insert/insert.component';
import { OfficeGetAllComponent } from './page/Office/get-all/get-all.component';
import { LoginComponent } from './page/user/login/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'user/login', component: LoginComponent },
    {path:'person/insert',component:PersonInsertComponent,canActivate:[authGuard]},
    {path:'person/get-all',component:PersonGetAllComponent,canActivate:[authGuard]},
    {path:'office/insert',component:OfficeInsertComponent,canActivate:[authGuard]},
    {path:'office/get-all',component:OfficeGetAllComponent,canActivate:[authGuard]}
];
