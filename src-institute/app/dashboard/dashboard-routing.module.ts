import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: 'admissions', loadChildren: () => import('./admissions/admissions.module').then(m => m.AdmissionsModule) },
			{ path: 'applicants', loadChildren: () => import('./applicants/applicants.module').then(m => m.ApplicantsModule) },
			{
				path: 'conduct-tests',
				data: { page: 'conduct-tests' },
				loadChildren: () => import('./common/data-visualizer/data-visualizer.module').then(m => m.DataVisualizerModule)
			},
			{ path: '', redirectTo: 'admissions', pathMatch: 'full' },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [
		RouterModule
	]
})
export class DashboardRoutingModule { }
