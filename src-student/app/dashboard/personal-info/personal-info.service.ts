import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesService } from '../shared/countries.service';
import { CustomValidators } from '../shared/custom-validators.service';
@Injectable()
export class PersonalInfoService {
	countries: string[] = [];
	cities: string[] = [];
	states: string[] = [];
	constructor(private http: HttpClient, private countriesService: CountriesService, private customValidators: CustomValidators) {
		this.countriesService.list().subscribe(countries => {
			this.countries = countries;
		})
	}
	public get(): Observable<PersonalInfo> {
		return this.http.get<PersonalInfo>('/api/personal-info/');
	}
	public edit(personalInfo: PersonalInfo) {
		return this.http.put('/api/personal-info/', personalInfo)
	}
	public createForm() {
		return new FormGroup({
			FirstName: new FormControl('', Validators.required),
			MiddleName: new FormControl(''),
			LastName: new FormControl('', Validators.required),
			Gender: new FormControl('', Validators.required),
			MaritalStatus: new FormControl('', Validators.required),
			DateOfBirth: new FormControl('', Validators.required),
			Nationality: new FormControl('', [Validators.required, this.customValidators.arrayValidator(this.countries)]),
			BirthCountry: new FormControl('', [Validators.required, this.customValidators.arrayValidator(this.countries)]),
			BirthState: new FormControl(''),
			BirthCity: new FormControl(''),
			IdCard: new FormControl('', Validators.required),
			OtherCitizenship: new FormControl('', [this.customValidators.arrayValidator(this.countries)])
		})

	}
}

export class PersonalInfo {
	constructor(
		public firstName: string = null,
		public middleName: string = null,
		public lastName: string = null,
		public gender: boolean = null,
		public maritalStatus: string = null,
		public dateOfBirth: string = null,
		public nationality: string = null,
		public birthCountry: string = null,
		public birthState: string = null,
		public birthCity: string = null,
		public idCard: string = null,
		public otherCitizenship: string = null
	) { }
}