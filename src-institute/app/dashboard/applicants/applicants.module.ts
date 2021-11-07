import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantsComponent } from './applicants.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
	{
		path: '',
		component: ApplicantsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
		ReactiveFormsModule, FormsModule,
		FlexLayoutModule,
		RouterModule.forChild(routes)
	],
	declarations: [ApplicantsComponent],
	bootstrap: [ApplicantsComponent]
})
export class ApplicantsModule { }
