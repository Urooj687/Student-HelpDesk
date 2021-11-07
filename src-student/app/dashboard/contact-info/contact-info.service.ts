import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Injectable()
export class ContactInfoService {

	constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
	public get(): Observable<ContactInfo> {
		return this.http.get<ContactInfo>('/api/contact-info/');
	}
	public editContactInfo(contactInfo: ContactInfo) {
		return this.http.put('/api/contact-info/', contactInfo)
	}
	public createForm(){
		return this.formBuilder.group({
			differentPermanent: [false, Validators.required],
			phone: [null, Validators.required],
			mobile: [null, Validators.required],
			currentAddress: this.formBuilder.group({
				country: [null, Validators.required],
				state: [null, Validators.required],
				city: [null, Validators.required],
				postalCode: [null, Validators.required],
				address: [null, Validators.required]
			}),
			permanentAddress: this.formBuilder.group({
				country: [null, Validators.required],
				state: [null, Validators.required],
				city: [null, Validators.required],
				postalCode: [null, Validators.required],
				address: [null, Validators.required]
			})
		})
	}
}

export class ContactInfo {
	public differentPermanent: boolean = null;
	public address: string = null;
	public postalCode: string = null;
	public currentAddress: Address;
	public permanentAddress: Address;
	constructor() {
		this.currentAddress = new Address();
		this.permanentAddress = new Address();
		this.differentPermanent = null;
		this.address = null;
		this.postalCode = null;
	}
}

export class Address {
	public country: string = null;
	public city: string = null;
	public phone: number = null;
	public mobile: number = null;
	constructor() { }
}