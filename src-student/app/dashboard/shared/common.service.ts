import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	public _filter(arr: string[], value: string) {
		const filterValue = value.toLowerCase();
		return arr.filter(country => country.toLowerCase().includes(filterValue));
	}
	public watchAndFilter(control: AbstractControl, arr: string[]) {
		return control
			.valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(arr, value))
			);
	}
}