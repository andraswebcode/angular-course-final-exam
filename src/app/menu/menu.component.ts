import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [MatToolbarModule, MatButtonModule, MatIconModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {
	constructor(protected readonly authService: AuthService) {}

	logout() {
		this.authService.logout().subscribe();
	}
}
