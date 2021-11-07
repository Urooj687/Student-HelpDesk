import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { PendingApplicationComponent } from './pending-application/pending-application.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [
			{ path: 'calender', component: CalenderComponent },
			{ path: 'personal-info', loadChildren: () => import('./personal-info/personal-info.module').then(m => m.PersonalInfoModule) },
			{ path: 'family-info', loadChildren: () => import('./family-info/family-info.module').then(m => m.FamilyInfoModule) },
			{ path: 'contact-info', loadChildren: () => import('./contact-info/contact-info.module').then(m => m.ContactInfoModule) },
			{ path: 'work-experience', loadChildren: () => import('./work-experience/work-experience.module').then(m => m.WorkExperienceModule)},
			{ path: 'education-info', loadChildren: () => import('./education-info/education-info.module').then(m => m.EducationInfoModule) },
			{
				path: 'acadamic-qualification',
				loadChildren: () => import('./acadamic-qualification/acadamic-qualification.module').then(m => m.AcadamicQualificationModule)
			},
			{ path: 'pending-application', component: PendingApplicationComponent },
			{ path: '', redirectTo: 'calender', pathMatch: 'full' },
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
