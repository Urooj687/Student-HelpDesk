import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AcadamicQualificationService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }
	public add(workExperience: AcadamicQualification){
		return this.http.post('/api/acadamic-qualification/', workExperience);
	}
	public get(eid: string): Observable<AcadamicQualification> {
		return this.http.get<AcadamicQualification>('/api/acadamic-qualification/' + "/" + eid);
	}
	public list(): Observable<AcadamicQualification[]> {
		return this.http.get<AcadamicQualification[]>('/api/acadamic-qualification/');
	}
	public edit(eid: string, workExperience: AcadamicQualification) {
		return this.http.put('/api/acadamic-qualification/' + "/" + eid, workExperience);
	}
	public createForm(){
		return this.formBuilder.group(new AcadamicQualification());
	}
}

export class AcadamicQualification {
	examName: string;
	country: string;
	date: Date;
	grade: string;
	constructor() {
		this.examName = null;
		this.country = null;
		this.date = null;
		this.grade = null;
	}
}