import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { InternshipExperienceService, InternshipExperience } from '../internship-experience.service';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../shared/countries.service';
import { CommonService } from '../../shared/common.service';
import { Observable } from 'rxjs';
import { CustomValidators } from '../../shared/custom-validators.service';

@Component({
	selector: 'app-add-internship',
	templateUrl: './add-internship.component.html',
	styleUrls: ['./add-internship.component.scss']
})
export class AddInternshipComponent implements OnInit {
	public experienceForm: FormGroup;
	public internshipExperience: InternshipExperience;
	public editingId: string = null;
	public countries: string[];
	public filteredCountries: Observable<string[]>
	constructor(
		private internshipService: InternshipExperienceService,
		private activeRoute: ActivatedRoute,
		private countriesService: CountriesService,
		private commonService: CommonService,
		private customValidators: CustomValidators) {
		this.editingId = this.activeRoute.snapshot.paramMap.get("id");
		this.experienceForm = this.internshipService.createForm();
	}

	ngOnInit() {
		if (this.editingId != null) {
			this.internshipService.get(this.editingId).subscribe(
				res => {
					this.experienceForm.patchValue(res);
				}
			)
		}
		this.countriesService.list().subscribe(res => {
			this.countries = res;
			this.experienceForm.get('country').clearValidators();
			this.experienceForm.get('country').setValidators([Validators.required, this.customValidators.arrayValidator(this.countries)])

			this.enableFilters();
		})
	}
	submit(form: FormGroup) {
		console.log(form.value);
		this.internshipExperience = Object.assign({}, form.value);
		if (this.editingId == null) {
			this.internshipService.add(this.internshipExperience).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
		else {
			this.internshipService.edit(this.editingId, this.internshipExperience).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
	}
	enableFilters() {
		this.filteredCountries = this.commonService.watchAndFilter(this.experienceForm.get('country'), this.countries)
	}
}
