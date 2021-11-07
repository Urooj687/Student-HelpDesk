import { Component, OnInit } from '@angular/core';
import { WorkExperienceService, WorkExperience } from '../work-experience.service';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CountriesService } from '../../shared/countries.service';
import { CustomValidators } from '../../shared/custom-validators.service';

@Component({
	selector: 'app-add-work',
	templateUrl: './add-work.component.html',
	styleUrls: ['./add-work.component.scss']
})
export class AddWorkComponent implements OnInit {
	public experienceForm: FormGroup;
	public workExperience: WorkExperience;
	public editingId: string = null;
	public countries: string[];
	public filteredCountries: Observable<string[]>;
	constructor(private workExperienceService: WorkExperienceService, private activeRoute: ActivatedRoute, private countriesService: CountriesService, private customValidators: CustomValidators) {
		this.editingId = this.activeRoute.snapshot.paramMap.get("id");
		this.experienceForm = this.workExperienceService.createForm();
	}

	ngOnInit() {
		if (this.editingId != null) {
			this.workExperienceService.get(this.editingId).subscribe(
				res => {
					this.experienceForm.patchValue(res);
				}
			)
		}
		this.countriesService.list().subscribe(res => {
			this.countries = res;
			this.experienceForm.get('country').clearValidators();
			this.experienceForm.get('country').setValidators([Validators.required, this.customValidators.arrayValidator(this.countries)]);
			this.enableFilters();
		})
	}
	submit(form: FormGroup) {
		console.log(form.value);
		this.workExperience = Object.assign({}, form.value);
		if (this.editingId == null) {
			this.workExperienceService.add(this.workExperience).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
		else {
			this.workExperienceService.edit(this.editingId, this.workExperience).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
	}
	enableFilters() {
		this.filteredCountries = this.experienceForm.get('country')
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filterCountries(value))
			);

	}
	private _filterCountries(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.countries.filter(country => country.toLowerCase().includes(filterValue));
	}

}
