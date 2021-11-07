import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AdmissionsService, Admission } from './admissions.service';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-admissions',
	templateUrl: './admissions.component.html',
	styleUrls: ['./admissions.component.scss']
})
export class AdmissionsComponent implements AfterViewInit {

	displayedColumns: string[] = ['title', 'start', 'end', 'actions'];
	categories: string[] = ['Computer Sceince', 'Software Engineering', 'Machine Learning', 'Network Security'];
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: Array<Admission>;
	showForm = false;
	isEditing = false;
	public admissionForm: FormGroup;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	constructor(private http: HttpClient, private admissionsService: AdmissionsService) {
		this.admissionForm = admissionsService.createForm();
	}
	submit(form: FormGroup) {
		if (this.isEditing) {
			console.log('Not yet implemented');
		} else {
			this.admissionsService.add(form.value)
				.subscribe(
					(res: Admission) => {
						this.data = [...this.data, res];
					}, (error) => {
						console.log(error);
					});
		}
	}
	ngAfterViewInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.admissionsService.list(
						this.sort.active, this.sort.direction, this.paginator.pageIndex);
				}),
				map(data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.isRateLimitReached = false;
					this.resultsLength = data.total;

					return data.admissions;
				}),
				catchError(() => {
					this.isLoadingResults = false;
					// Catch if the GitHub API has reached its rate limit. Return empty data.
					this.isRateLimitReached = true;
					return observableOf([]);
				})
			).subscribe(data => this.data = data);
	}

}
