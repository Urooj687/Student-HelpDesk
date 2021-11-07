import { Component, OnInit } from '@angular/core';
import { ContactInfoService, ContactInfo } from './contact-info.service';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CountriesService } from '../shared/countries.service';
import { CustomValidators } from '../shared/custom-validators.service';
@Component({
	selector: 'app-contact-info',
	templateUrl: './contact-info.component.html',
	styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
	public permanentAddressDifferent = false;
	contactInfo: ContactInfo;
	public contactInfoForm: FormGroup;
	countries: string[] = [];
	cities: string[] = [];
	states: string[] = [];
	permanentCountries: Observable<string[]>;
	permanentStates: Observable<string[]>;
	permanentCities: Observable<string[]>;
	currentCountries: Observable<string[]>;
	currentStates: Observable<string[]>;
	currentCities: Observable<string[]>;
	formEnabled: boolean = false;
	constructor(private contactInfoService: ContactInfoService, private countriesService: CountriesService, private customValidators: CustomValidators) {
		this.contactInfoForm = contactInfoService.createForm();
	}

	ngOnInit() {
		this.get();
		this.enableFilters();
		this.countriesService.list().subscribe(
			res => {
				this.countries = res;
				this.contactInfoForm.get('currentAddress.country').setValidators([Validators.required, this.customValidators.arrayValidator(this.countries)]);
			}
		)
		this.contactInfoForm.disable();
	}
	get() {
		this.contactInfoService.get().subscribe(
			res => {
				this.contactInfo = Object.assign({}, res);
				this.contactInfoForm.patchValue(this.contactInfo);
			},
			err => {
				console.log("Error: ", err);
			}
		);
	}
	onCurrentStateFocus() {

		this.countriesService.states(
			this.contactInfoForm.get('currentAddress.country').value
		).subscribe(
			res => {
				this.states = res;
				this.contactInfoForm.get('currentAddress.state').clearValidators();
				this.contactInfoForm.get('currentAddress.state').setValidators([Validators.required, this.customValidators.arrayValidator(this.states)]);
			},
			err => {
				console.log(err);
			}
		)
	}
	onPermanentCityFocus() {
		this.countriesService.cities(
			this.contactInfoForm.get('permanentAddress.country').value,
			this.contactInfoForm.get('permanentAddress.state').value
		).subscribe(
			res => {
				this.cities = res;
				this.contactInfoForm.get('permanentAddress.city').clearValidators();
				this.contactInfoForm.get('permanentAddress.city').setValidators([Validators.required, this.customValidators.arrayValidator(this.cities)]);
			},
			error => {
				console.log(error);
			})
	}
	onPermanentStateFocus() {

		this.countriesService.states(
			this.contactInfoForm.get('currentAddress.country').value
		).subscribe(
			res => {
				this.states = res;
				this.contactInfoForm.get('currentAddress.state').clearValidators();
				this.contactInfoForm.get('currentAddress.state').setValidators([Validators.required, this.customValidators.arrayValidator(this.states)]);
			},
			err => {
				console.log(err);
			}
		)
	}
	onCurrentCityFocus() {
		this.countriesService.cities(
			this.contactInfoForm.get('currentAddress.country').value,
			this.contactInfoForm.get('currentAddress.state').value
		).subscribe(
			res => {
				this.cities = res;
				this.contactInfoForm.get('currentAddress.city').clearValidators();
				this.contactInfoForm.get('currentAddress.city').setValidators([Validators.required, this.customValidators.arrayValidator(this.cities)]);
			},
			error => {
				console.log(error);
			})
	}
	update(form: FormGroup) {
		this.contactInfo = Object.assign({}, form.value);
		if (this.contactInfo.differentPermanent == false) {
			this.contactInfo.permanentAddress = Object.assign({}, this.contactInfo.currentAddress);
		}
		this.contactInfoService.editContactInfo(this.contactInfo).subscribe(
			res => {
				console.log(res);
				this.contactInfoForm.disable();
				this.formEnabled = false;
			},
			err => {
				console.log(err);
			}
		)
	}

	enableForm() {
		this.contactInfoForm.enable();
		this.formEnabled = true;
	}
	enableFilters() {
		this.currentCountries = this.contactInfoForm.get('currentAddress.country')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);
		this.currentStates = this.contactInfoForm.get('currentAddress.state')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterStates(value || ""))
			);
		this.currentCities = this.contactInfoForm.get('currentAddress.city')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCities(value))
			);
		this.permanentCountries = this.contactInfoForm.get('permanentAddress.country')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);
		this.permanentStates = this.contactInfoForm.get('permanentAddress.state')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterStates(value || ""))
			);
		this.permanentCities = this.contactInfoForm.get('permanentAddress.city')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCities(value))
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
}
