import { Component, DestroyRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		FormsModule,
		RouterLink
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	public username?: string;
	public password?: string;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly snackBar: MatSnackBar,
		private readonly destroyRef: DestroyRef
	) {}

	public login() {
		if (this.username && this.password) {
			this.authService
				.login(this.username, this.password)
				.pipe(
					tap(() => this.router.navigate(['/data'])),
					catchError((error) => {
						this.snackBar.open(error, '', { duration: 4000 });
						throw error;
					}),
					takeUntilDestroyed(this.destroyRef)
				)
				.subscribe();
		}
	}
}
