import { Component, DestroyRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
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
		private readonly destroyRef: DestroyRef
	) {}

	public login() {
		if (this.username && this.password) {
			this.authService
				.login(this.username, this.password)
				.pipe(
					tap(() => this.router.navigate(['/covid-data'])),
					takeUntilDestroyed(this.destroyRef)
				)
				.subscribe();
		}
	}
}
