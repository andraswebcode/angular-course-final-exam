import { Component, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
	selector: 'app-registration',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		RouterLink
	],
	templateUrl: './registration.component.html',
	styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef
	) {}

	register() {
		if (
			this.username &&
			this.email &&
			this.password &&
			this.password === this.passwordConfirm
		) {
			this.authService
				.register({
					username: this.username,
					email: this.email,
					password: this.password
				})
				.pipe(
					tap(() => this.router.navigate(['/covid-data'])),
					takeUntilDestroyed(this.destroyRef)
				)
				.subscribe();
		}
	}
}
