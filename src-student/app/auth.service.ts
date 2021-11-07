import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService implements CanActivate, CanActivateChild {

	constructor(private route: Router) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.loggedIn()) {
			return true;
		}
		else {
			this.route.navigate(['/auth/login']);
			return false;
		}
	}
	loggedIn(){
		const auth = localStorage.getItem('auth');
		if(auth){
			const date = new Date(JSON.parse(auth).exp);
			if(date > new Date()){
				return true;
			}
			else{
				return false;
			}
		}
		return false;
	}
	getId(){
		const auth = localStorage.getItem('auth');
		if(auth){
			return JSON.parse(auth).id;
		}
	}
	getToken(){
		const auth = localStorage.getItem('auth');
		if(auth){
			return JSON.parse(auth).token;
		}
	}
	logout(){
		localStorage.removeItem("auth");
		return this.route.navigate(['/auth/login']);
	}
	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(state.url.match(/dashboard?\/.*/)){
			if (this.loggedIn()) {
				return true;
			}
			else {
				this.route.navigate(['/auth/login']);
				return false;
			}
		}
		else if(state.url.match(/auth?\/.*/)){
			if (this.loggedIn()) {
				this.route.navigate(['/dashboard']);
				return false;
			}
			else {
				return true;
			}
		}
		
	}
}
