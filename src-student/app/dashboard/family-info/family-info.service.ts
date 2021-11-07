import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
@Injectable()
export class FamilyInfoService {

	constructor(private http: HttpClient, private authService: AuthService, private formBuilder:FormBuilder) { }
	public get(): Observable<FamilyInfo> {
		return this.http.get<FamilyInfo>('/api/family-info/');
	}
	public edit(familyInfo: FamilyInfo) {
		return this.http.put('/api/family-info/', familyInfo)
	}
	public createForm(){
		return this.formBuilder.group({
			father: this.formBuilder.group({
				name: [null, Validators.required],
				alive: [null, Validators.required],
				occupation: [null],
				position: [null],
				working: [false],
				company: [null]
			}),
			mother: this.formBuilder.group({
				name: [null, Validators.required],
				alive: [null, Validators.required],
				occupation: [null],
				position: [null],
				working: [false],
				company: [null]
			}),
			totalSiblings: [null, Validators.required],
			maritalStatus: [null, Validators.required],
			monthlyIncome: [null, Validators.required]
		})
	}
}

export class FamilyInfo {
	father: Father;
	mother: Mother;
	totalSiblings: number;
	maritalStatus: string;
	monthlyIncome: number;
	constructor(){
		this.father = new Father();
		this.mother = new Mother();
		this.totalSiblings = 0;
		this.maritalStatus = "";
		this.monthlyIncome = 0;
	}
}

export class Father {
	name: string;
	alive: boolean;
	occupation: string;
	position: string;
	working: boolean;
	company: string;
	constructor() {
		this.name = "";
		this.alive = false;
		this.occupation = "";
		this.position = "";
		this.working = false;
		this.company = "";
	}
}
export class Mother {
	name: string = "";
	alive: boolean = false;
	occupation: string = "";
	position: string = "";
	working: boolean;
	company: string;
	constructor() {
		this.name =  "";
		this.alive =  false;
		this.occupation =  "";
		this.position =  "";
		this.working = false;
		this.company = "";
	}
}