import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';



const routes: Routes = [
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
		canActivateChild: [AuthService]
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
		canActivateChild: [AuthService]
	},
	{
		path: '**',
		redirectTo: 'auth/login'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [
		RouterModule
	],
	providers: [AuthService]
})
export class RoutingModule { }
