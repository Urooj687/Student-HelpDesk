import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataVisualizerComponent } from './data-visualizer.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';




const routes: Routes = [
	{
		path: '',
		component: DataVisualizerComponent
	}
];


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatSidenavModule,
		MatButtonModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
		MatFormFieldModule,
		MatSelectModule,
		MatDatepickerModule,
		ReactiveFormsModule,
		FormsModule,
		FlexLayoutModule,
		MatIconModule,
		RouterModule.forChild(routes)
	],
	declarations: [DataVisualizerComponent],
})
export class DataVisualizerModule { }
