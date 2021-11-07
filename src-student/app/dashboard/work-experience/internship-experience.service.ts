import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class InternshipExperienceService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder, private authService: AuthService) { }
	public add(internshipExperience: InternshipExperience){
		const sid = this.authService.getId();
		return this.http.post('/api/internship-experience/' + sid, internshipExperience);
	}
	public get(eid: string): Observable<InternshipExperience> {
		const sid = this.authService.getId();
		return this.http.get<InternshipExperience>('/api/internship-experience/' + sid + "/" + eid);
	}
	public list(): Observable<InternshipExperience[]> {
		const sid = this.authService.getId();
		return this.http.get<InternshipExperience[]>('/api/internship-experience/' + sid);
	}
	public edit(eid: string, internshipExperience: InternshipExperience) {
		const sid = this.authService.getId();
		return this.http.put('/api/internship-experience/' + sid + "/" + eid, internshipExperience);
	}
	public createForm(){
		let temp = new InternshipExperience();
		return this.formBuilder.group(temp);
	}
}

export class InternshipExperience {
	country: string;
	company: string;
	duration: number;
	subject: string;
	constructor() {
		this.country = null;
		this.company = null;
		this.duration = null;
		this.subject = null;
	}
}