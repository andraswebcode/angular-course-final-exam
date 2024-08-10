import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'data',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'registration',
		component: RegistrationComponent
	},
	{
		path: 'data',
		canActivate: [authGuard],
		loadComponent: () => import('./data/data/data.component').then((m) => m.DataComponent)
	}
];
