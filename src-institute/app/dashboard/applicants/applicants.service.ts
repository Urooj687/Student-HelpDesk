import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ApplicantsService {

	constructor(private http: HttpClient) { }

	public list(sort: string, order: string, page: number): Observable<AdmissionList> {
		const href = 'https://74e1cd70-4ce7-4aba-9d90-8ccf2d14d4c3.mock.pstmn.io/api/institute/admissions';
		const requestUrl =
			`${href}`;

		return this.http.get<AdmissionList>(requestUrl);
	}
}
export interface AdmissionList {
	applicants: Applicant[];
	total: number;
}

export interface Applicant {
	title: string;
	start: string;
	end: string;
	categories: string[];
	fee: string;
}

export interface Cateogory{
	name: string;
	preReqs: string[];
}