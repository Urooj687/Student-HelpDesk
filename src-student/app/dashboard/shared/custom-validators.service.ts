import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";

@Injectable({
	providedIn: 'root'
})
export class CustomValidators {
	arrayValidator(arr: string[]): ValidatorFn {
		return (control: AbstractControl) => {
			if (control.value && arr.indexOf(control.value) < 0) {
				return { notFound: true };
			}
			return null;
		}
	}
}