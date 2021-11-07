
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from './work-experience.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddWorkComponent } from './add-work/add-work.component';
import { AddInternshipComponent } from './add-internship/add-internship.component';



const routes: Routes = [
	{
		path: '',
		component: WorkExperienceComponent
	},
	{ path: 'add-work', component: AddWorkComponent },
	{ path: 'add-work/:id', component: AddWorkComponent },
	{ path: 'add-internship', component: AddInternshipComponent },
	{ path: 'add-internship/:id', component: AddInternshipComponent },
];


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatFormFieldModule,
		MatSelectModule,
		MatDatepickerModule,
		MatAutocompleteModule,
		MatCheckboxModule,
		MatInputModule,
		FlexLayoutModule,
		MatTableModule,
		MatMenuModule,
		MatCheckboxModule,
		FormsModule,
		MatButtonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		WorkExperienceComponent,
		AddWorkComponent,
		AddInternshipComponent],
	bootstrap: [WorkExperienceComponent]
})
export class WorkExperienceModule { }
