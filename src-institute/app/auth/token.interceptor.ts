import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService) {
		console.log('here');
	}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});
		return next.handle(request);
	}
}
