import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WorkExperienceService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }
	public add(workExperience: WorkExperience){
		return this.http.post('/api/work-experience/', workExperience);
	}
	public get(eid: string): Observable<WorkExperience> {
		return this.http.get<WorkExperience>('/api/work-experience/' + "/" + eid);
	}
	public list(): Observable<WorkExperience[]> {
		return this.http.get<WorkExperience[]>('/api/work-experience/');
	}
	public edit(eid: string, workExperience: WorkExperience) {
		return this.http.put('/api/work-experience/' + "/" + eid, workExperience);
	}
	public createForm(){
		return this.formBuilder.group(new WorkExperience());
	}
}

export class WorkExperience {
	country: string;
	company: string;
	designation: string;
	position: string;
	working: boolean;
	start: Date;
	end: Date;
	details: string;
	constructor() {
		this.country = null;
		this.company = null;
		this.designation = null;
		this.position = null;
		this.working = null;
		this.start = null;
		this.end = null;
		this.details = null;
	}
}