import { Component, DestroyRef, signal } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, tap } from 'rxjs';
import { RegisterUser } from '../models/user.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
	selector: 'app-registration',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		ReactiveFormsModule,
		RouterLink
	],
	templateUrl: './registration.component.html',
	styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
	registration = new FormGroup({
		username: new FormControl<string>('', [Validators.required]),
		email: new FormControl<string>('', [Validators.required, Validators.email]),
		password: new FormControl<string>('', [Validators.required]),
		passwordConfirm: new FormControl<string>('', [Validators.required])
	});

	loading = signal(false);

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly snackBar: MatSnackBar,
		private readonly destroyRef: DestroyRef
	) {}

	register() {
		this.loading.set(true);
		if (this.registration.value.password === this.registration.value.passwordConfirm) {
			const user: RegisterUser = {
				username: this.registration.value.username!,
				email: this.registration.value.email!,
				password: this.registration.value.password!
			};
			this.authService
				.register(user)
				.pipe(
					tap(() => this.router.navigate(['/data'])),
					finalize(() => this.loading.set(false)),
					catchError((error) => {
						this.snackBar.open(error, '', {
							duration: 4000
						});
						throw error;
					}),
					takeUntilDestroyed(this.destroyRef)
				)
				.subscribe();
		} else {
			this.loading.set(false);
			this.snackBar.open('Passwords must be match.', '', {
				duration: 4000
			});
		}
	}
}
