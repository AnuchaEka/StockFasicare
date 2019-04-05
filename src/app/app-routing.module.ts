import { AuthGuardService } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login',  loadChildren: './pages/login/login.module#LoginPageModule'   },
  { path: 'home',  loadChildren: './members/home/home.module#HomePageModule'   },
  { path: 'editprofile/:id', loadChildren: './members/editprofile/editprofile.module#EditprofilePageModule' },
  { path: 'dashboard', loadChildren: './members/dashboard/dashboard.module#DashboardPageModule' }, 
  { path: 'changpassword/:id', loadChildren: './members/changpassword/changpassword.module#ChangpasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
