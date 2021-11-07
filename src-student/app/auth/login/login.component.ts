import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserService, Response } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});
	constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

	ngOnInit() {
	}
	public onSubmit() {
		const user: User = new User(this.loginForm.value.email, this.loginForm.value.password);
		this.userService.login(user).subscribe(
			(res: Response) => {
				let exp = new Date();
				exp.setDate(exp.getDate() + 1);
				const auth = {
					"token": res.token,
					"id": res.id,
					"exp": exp
				}
				localStorage.setItem('auth', JSON.stringify(auth));
				this.router.navigate(['/dashboard']);
			},
			(err) => {
				this.snackBar.open('Invalid email or password', '', { duration: 3000 });
			}
		);
	}
}
