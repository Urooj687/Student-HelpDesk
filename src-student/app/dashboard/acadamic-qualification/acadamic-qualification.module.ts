import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcadamicQualificationComponent } from './acadamic-qualification.component';
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
import { AddAcadamicComponent } from './add-acadamic/add-acadamic.component';



const routes: Routes = [
	{
		path: '',
		component: AcadamicQualificationComponent
	},
	{ path: 'add-acadamic', component: AddAcadamicComponent },
	{ path: 'add-acadamic/:id', component: AddAcadamicComponent },
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
		FormsModule,
		MatButtonModule,
		RouterModule.forChild(routes)
	],
	declarations: [AcadamicQualificationComponent, AddAcadamicComponent],
	bootstrap: [AcadamicQualificationComponent]
})
export class AcadamicQualificationModule { }
