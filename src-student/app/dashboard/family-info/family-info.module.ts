import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyInfoComponent } from './family-info.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';



const routes: Routes = [
	{
		path: '',
		component: FamilyInfoComponent
	}
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
	RouterModule.forChild(routes)
  ],
  declarations: [FamilyInfoComponent],
  bootstrap: [FamilyInfoComponent]
})
export class FamilyInfoModule { }
