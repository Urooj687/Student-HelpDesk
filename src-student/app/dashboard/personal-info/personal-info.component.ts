import { Component, OnInit } from '@angular/core';
import { PersonalInfoService, PersonalInfo } from './personal-info.service';
import { FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../shared/countries.service';
import { debounceTime, filter, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomValidators } from '../shared/custom-validators.service';

@Component({
	selector: 'app-personal-info',
	templateUrl: './personal-info.component.html',
	styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
	personalInfo: PersonalInfo = new PersonalInfo();
	formEnabled: boolean = false;
	countries: string[];
	cities: string[] = [];
	states: string[] = [];
	birthCountries: Observable<string[]>;
	birthStates: Observable<string[]>;
	birthCities: Observable<string[]>;
	nationalities: Observable<string[]>;
	otherCitizenships: Observable<string[]>;
	public personalInfoForm: FormGroup;
	constructor(
		private personalInfoService: PersonalInfoService,
		private countriesService: CountriesService,
		private customValidators: CustomValidators
	) {
		this.personalInfoForm = personalInfoService.createForm();
	}

	ngOnInit() {
		this.personalInfoForm.disable();
		this.get();
		this.countriesService.list().subscribe(res => {
			this.countries = res;
		}, err => {
			console.log("Error", err);
		});
		this.enableFilters();

	}
	get() {
		this.personalInfoService.get().subscribe(
			res => {
				this.personalInfo = res;
				this.personalInfoForm.patchValue({
					FirstName: this.personalInfo.firstName,
					MiddleName: this.personalInfo.middleName,
					LastName: this.personalInfo.lastName,
					Gender: this.personalInfo.gender,
					MaritalStatus: this.personalInfo.maritalStatus,
					DateOfBirth: this.personalInfo.dateOfBirth,
					Nationality: this.personalInfo.nationality,
					BirthCountry: this.personalInfo.birthCountry,
					BirthState: this.personalInfo.birthState,
					BirthCity: this.personalInfo.birthCity,
					IdCard: this.personalInfo.idCard,
					OtherCitizenship: this.personalInfo.otherCitizenship
				})
				//this is for fetching city data we get country from existing data
				if (this.personalInfo.birthCountry) {
					this.countriesService.cities(this.personalInfo.birthCountry, this.personalInfo.birthState).subscribe(
						res => {
							this.cities = res;
						},
						error => {
							console.error(error);
						})
				}
			},
			err => {
				console.log("Error occured");
			}
		);
	}
	onStateFocus() {
		
		this.countriesService.states(
			this.personalInfoForm.get('BirthCountry').value
		).subscribe(
			res => {
				this.states = res;
				this.personalInfoForm.controls['BirthState'].clearValidators();
				this.personalInfoForm.controls['BirthState'].setValidators([Validators.required, this.customValidators.arrayValidator(this.states)]);
			},
			err => {
				console.log(err);
			}
		)
	}
	onCityFocus() {
		this.countriesService.cities(
			this.personalInfoForm.get('BirthCountry').value,
			this.personalInfoForm.get('BirthState').value
		).subscribe(
			res => {
				this.cities = res;
				this.personalInfoForm.controls['BirthCity'].clearValidators();
				this.personalInfoForm.controls['BirthCity'].setValidators([Validators.required, this.customValidators.arrayValidator(this.cities)]);
			},
			error => {
				console.log(error);
			})
	}
	update(form: FormGroup) {
		var data = form.value;
		Object.assign(this.personalInfo, data);
		this.personalInfoService.edit(data).subscribe(
			res => {
				console.log(res);
				this.personalInfoForm.disable();
				this.formEnabled = false;
			},
			err => {
				console.log(err);
			}
		)
	}
	enableForm() {
		this.personalInfoForm.enable();
		this.formEnabled = true;
	}
	enableFilters() {
		this.birthCountries = this.personalInfoForm.get('BirthCountry')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);
		this.nationalities = this.personalInfoForm.get('Nationality')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);
		this.otherCitizenships = this.personalInfoForm.get('OtherCitizenship')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);
		this.birthCities = this.personalInfoForm.get('BirthCity')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCities(value))
			);
		this.birthStates = this.personalInfoForm.get('BirthState')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterStates(value))
			);

	}
	private _filterCountries(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.countries.filter(country => country.toLowerCase().includes(filterValue));
	}
	private _filterCities(value: string): string[] {
		
		const filterValue = value.toLowerCase();
		return this.cities.filter(city => city.toLowerCase().includes(filterValue));
	}
	private _filterStates(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.states.filter(state => state.toLowerCase().includes(filterValue));
	}
	public getName() {
		let name = '';
		name += (this.personalInfo.firstName) ? this.personalInfo.firstName : '';
		name += (this.personalInfo.middleName) ? (' ' + this.personalInfo.middleName) : '';
		name += (this.personalInfo.lastName) ? (' ' + this.personalInfo.lastName) : '';
		return name;
	}
}
