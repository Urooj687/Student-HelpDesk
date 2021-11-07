import { Component, OnInit } from '@angular/core';
import { AcadamicQualificationService, AcadamicQualification } from '../acadamic-qualification.service';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../shared/countries.service';
import { CommonService } from '../../shared/common.service';
import { CustomValidators } from '../../shared/custom-validators.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-add-acadamic',
	templateUrl: './add-acadamic.component.html',
	styleUrls: ['./add-acadamic.component.scss']
})
export class AddAcadamicComponent implements OnInit {
	form: FormGroup;
	acadamicQualification: AcadamicQualification;
	public editingId: string = null;
	countries: string[];
	filteredCountries: Observable<string[]>;
	constructor(
		private acadamicQualificationService: AcadamicQualificationService,
		private activeRoute: ActivatedRoute,
		private countriesService: CountriesService,
		private commonService: CommonService,
		private customValidators: CustomValidators) { }
	ngOnInit() {
		this.form = this.acadamicQualificationService.createForm();
		this.editingId = this.activeRoute.snapshot.paramMap.get("id");
		if (this.editingId != null) {
			this.acadamicQualificationService.get(this.editingId).subscribe(
				res => {
					this.form.patchValue(res);
				}
			)
		}
		this.countriesService.list().subscribe(res => {
			this.countries = res;
			let countryControl = this.form.get('country');
			this.filteredCountries = this.commonService.watchAndFilter(countryControl, this.countries)
			countryControl.clearValidators();
			countryControl.setValidators([Validators.required, this.customValidators.arrayValidator(this.countries)]);
		})
	}
	submit(form: FormGroup) {
		console.log(form.value);
		this.acadamicQualification = Object.assign({}, form.value);
		if (this.editingId == null) {
			this.acadamicQualificationService.add(this.acadamicQualification).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
		else {
			this.acadamicQualificationService.edit(this.editingId, this.acadamicQualification).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
	}

}
