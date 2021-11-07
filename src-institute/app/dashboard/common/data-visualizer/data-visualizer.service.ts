import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { InputBase } from './input-base';
@Injectable({
	providedIn: 'root'
})
export class DataVisualizerService {

	constructor(private http: HttpClient) { }
	toFormGroup(inputs: InputBase<any>[]) {
		const group: any = {};

		inputs.forEach(input => {
			const formControl = new FormControl();
			const validators = [];
			if (input.required) {
				validators.push(Validators.required);
			}
			if (input.controlType === 'dropdown') {
				validators.push(this.arrayValidator(Array.from(input.options.keys())));
			}
			group[input.key] = formControl;
		});
		return new FormGroup(group);
	}
	arrayValidator(arr: string[]): ValidatorFn {
		return (control: AbstractControl) => {
			if (control.value && arr.indexOf(control.value) < 0) {
				return { notFound: true };
			}
			return null;
		};
	}
	getConductTestInputs() {
		return [
			new InputBase<Date>({
				key: 'date',
				required: true,
				controlType: 'date',
				label: 'Test date'
			}),
			new InputBase<string>({
				key: 'admission',
				required: true,
				controlType: 'dropdown',
				label: 'Responding admission',
				options: new Map()
			}),
			new InputBase<number>({
				key: 'totalApplicants',
				required: true,
				controlType: 'number',
				label: 'Allowed applicants'
			}),
			new InputBase<string>({
				key: 'center',
				required: true,
				controlType: 'textbox',
				label: 'Test center'
			}),
		];
	}
	getInputData(page: string) {
		switch (page) {
			case 'conduct-tests':
				return this.getConductTestInputs();
				break;
			default:
				return null;
		}
	}
	postData(form: FormGroup, page: string) {
		return this.http.post(`/api/${page}`, form.value);
	}
}




// export class TextboxInput extends InputBase<string> {
// 	controlType = 'textbox';
// 	type: string;

// 	constructor(options: {} = {}) {
// 		super(options);
// 		this.type = options['type'] || '';
// 	}
// }

// export class DropdownInput extends InputBase<string> {
// 	controlType = 'dropdown';
// 	options: { key: string, value: string }[] = [];

// 	constructor(options: {} = {}) {
// 		super(options);
// 		this.options = options['options'] || [];
// 	}
// }

