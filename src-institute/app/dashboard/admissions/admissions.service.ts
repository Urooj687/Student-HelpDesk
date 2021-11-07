import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class AdmissionsService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

	public list(sort: string, order: string, page: number): Observable<AdmissionList> {
		const href = `/api/institute/admissions?sort=${sort}&order=${order}&page=${page}`;
		const requestUrl =
			`${href}`;

		return this.http.get<AdmissionList>(requestUrl);
	}
	public createForm() {
		return this.formBuilder.group({
			title: [null, Validators.required],
			categories: [null, Validators.required],
			charges: [null, Validators.required],
			start: [null, Validators.required],
			end: [null, Validators.required]
		});
	}
	public add(admission: Admission) {
		return this.http.post(`/api/institute/admissions`, admission);
	}
}
export interface AdmissionList {
	admissions: Admission[];
	total: number;
}

export interface Admission {
	title: string;
	categories: string[];
	charges: number;
	start: string;
	end: string;
}

export interface Cateogory {
	name: string;
	preReqs: string[];
}
