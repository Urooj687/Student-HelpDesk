import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
	},
	{
		path: '**',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];



@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	providers: [],
	declarations: []
})
export class AuthRoutingModule { }
