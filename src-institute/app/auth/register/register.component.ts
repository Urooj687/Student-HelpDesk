import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	public registrationForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		reEmail: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required, Validators.pattern('^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+)|((?=.*[a-z])(?=.*[A-Z])(?=.[!@#\$%\^&])(?=.*[0-9])[a-zA-Z0-9]+)$')]),
		rePassword: new FormControl('', [Validators.required]),
		accept: new FormControl('', [Validators.required, Validators.pattern('true')])
	}, [this.matchValuesValidator('email', 'reEmail'), this.matchValuesValidator('password', 'rePassword')]);
	constructor(
		private userService: UserService,
		private snackBar: MatSnackBar,
		private router: Router
	) { }
	onSubmit() {
		const user: User = new User(this.registrationForm.value.email, this.registrationForm.value.password);
		this.userService.registerUser(user).subscribe(
			(res) => {
				this.router.navigate(['/auth/login']);
			},
			(err) => {
				console.log(err);
				this.snackBar.open('Email already in use.', '', { duration: 3000 });
			}
		);
	}
	ngOnInit() {
	}
	//match values of two inputs
	matchValuesValidator(actualId: string, reTypedId: string): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const actual = control.get(actualId).value;
			const reTyped = control.get(reTypedId).value;
			const matching = actual == reTyped;
			let error = {};
			error[actualId + "MatchError"] = { value: reTyped };
			if (!matching) {
				control.get(reTypedId).setErrors(error)
				return error;
			}
			else {
				null;
			}
		};
	}
	//to be deleted
	getFormValidationErrors() {
		console.log("Error#")
		console.log(this.registrationForm.errors);

	}

}
