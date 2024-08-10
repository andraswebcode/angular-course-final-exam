import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {
	constructor(protected readonly authService: AuthService, private readonly router: Router) {}

	logout() {
		this.authService
			.logout()
			.pipe(tap(() => this.router.navigate(['/login'])))
			.subscribe();
	}
}
