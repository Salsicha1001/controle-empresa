import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/auth.guard';
import { SalsichaHomeComponent } from './pages/salsicha-home/salsicha-home.component';
import { DetailsProjectComponent } from './salsicha/details-project/details-project.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'salsicha3d', component: SalsichaHomeComponent, canActivate: [AuthGuard] }, 
  { path: 'salsicha3d/details', component: DetailsProjectComponent, canActivate: [AuthGuard] },  // Proteger a rota "home"
   // Proteger a rota "home"
    // Proteger a rota "home"

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
