import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationInfoComponent } from './education-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddEducationComponent } from './add-education/add-education.component';



const routes: Routes = [
	{
		path: '',
		component: EducationInfoComponent
	},
	{ path: 'add-education', component: AddEducationComponent },
	{ path: 'add-education/:id', component: AddEducationComponent },
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
		MatCardModule,
		MatInputModule,
		FlexLayoutModule,
		RouterModule.forChild(routes)
	],
	declarations: [EducationInfoComponent, AddEducationComponent],
	bootstrap: [EducationInfoComponent]
})
export class EducationInfoModule { }
