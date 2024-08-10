import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'covid-data',
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
		path: 'covid-data',
		canActivate: [authGuard],
		loadComponent: () =>
			import('./covid-data/covid-data.component').then((m) => m.CovidDataComponent)
	}
];
