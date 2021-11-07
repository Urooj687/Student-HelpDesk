import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class UserService {

	constructor(private http: HttpClient) { }
	public registerUser(user: User) {
		return this.http.post('/api/student/', user)
	}
	public login<Response>(user: User) {
		return this.http.post<Response>('/api/auth/login', user)
	}

}

export class User {
	constructor(
		public email: string = null, public password: string = null
	) { }
}

export interface Response {
	token: string,
	id: string
}