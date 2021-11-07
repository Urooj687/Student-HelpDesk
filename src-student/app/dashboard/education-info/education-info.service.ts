import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EducationInfoService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }
	public add(workExperience: EducationInfo) {
		return this.http.post('/api/education-info/', workExperience);
	}
	public get(eid: string): Observable<EducationInfo> {
		return this.http.get<EducationInfo>('/api/education-info/' + "/" + eid);
	}
	public list(): Observable<EducationInfo[]> {
		return this.http.get<EducationInfo[]>('/api/education-info/');
	}
	public edit(eid: string, workExperience: EducationInfo) {
		return this.http.put('/api/education-info/' + "/" + eid, workExperience);
	}
	public createForm() {
		return this.formBuilder.group({
			country: [null, Validators.required],
			state: null,
			city: [null, Validators.required],
			institution: [null, Validators.required],
			educationType: [null, Validators.required],
			field: [null, Validators.required],
			status: [null, Validators.required],
			start: [null, Validators.required],
			end: [null, Validators.required],
			grade: this.formBuilder.group({
				gradeType: [null, Validators.required],
				total: [null, Validators.required],
				obtained: [null, Validators.required]
			})
		})
	}
}

export class EducationInfo {
	country: string;
	state: string;
	city: string;
	institution: string;
	educationType: string;
	field: string;
	status: boolean;
	start: Date;
	end: Date;
	grade: Grade;
}

export class Grade {
	gradeType: string;
	total: number;
	obtained: number;
}