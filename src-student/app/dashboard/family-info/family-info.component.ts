import { Component, OnInit } from '@angular/core';
import { FamilyInfoService, FamilyInfo, Father, Mother } from './family-info.service';
import { NgForm, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-family-info',
	templateUrl: './family-info.component.html',
	styleUrls: ['./family-info.component.scss']
})
export class FamilyInfoComponent implements OnInit {
	familyInfo = new FamilyInfo();
	public familyInfoForm: FormGroup;
	formEnabled: boolean = false;

	constructor(private familyInfoService: FamilyInfoService, private formBuilder: FormBuilder) {
		this.familyInfoForm = this.familyInfoService.createForm();
	}


	ngOnInit() {
		this.familyInfoForm.disable();
		this.get();
	}

	
	get() {
		this.familyInfoService.get().subscribe(
			res => {
				this.familyInfo = Object.assign({}, res);
				this.familyInfoForm.patchValue(this.familyInfo);
			},
			err => {
				console.log("Error occured");
			}
		);
	}
	update(form: FormGroup) {
		this.familyInfo = Object.assign({}, form.value);
		console.log(this.familyInfo);
		this.familyInfoService.edit(this.familyInfo).subscribe(
			res => {
				this.familyInfoForm.disable();
				this.formEnabled = false;
			},
			err => {
				console.log(err);
			}
		)
	}
	enableForm(){
		this.familyInfoForm.enable();
		this.formEnabled = true;
	}
}
