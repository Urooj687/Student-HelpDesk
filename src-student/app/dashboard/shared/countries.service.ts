import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class CountriesService {
	constructor(private http: HttpClient) { }
	public list(keyWord: string = ''): Observable<string[]> {
		keyWord = keyWord.toLowerCase();
		let request = this.http.get<string[]>('/api/countries')
			.pipe(startWith(JSON.parse(localStorage['countries'] || '[]')))
		request.subscribe(res => {
			localStorage['countries'] = JSON.stringify(res)
		})
		return request;
	}
	public states(country: string) {
		let request = this.http.get<string[]>(`/api/countries/${country}/states`)
			.pipe(startWith(JSON.parse(localStorage[country] || '[]')))
		request.subscribe(res => {
			localStorage[country] = JSON.stringify(res)
		})
		return request;
	}
	public cities(country: string, state: string) {
		let request = this.http.get<string[]>(`/api/countries/${country}/states/${state}/cities`)
			.pipe(startWith(JSON.parse(localStorage[country+state] || '[]')))
		request.subscribe(res => {
			localStorage[country+state] = JSON.stringify(res)
		})
		return request;
	}
}