import { Injectable, signal } from '@angular/core';
import { User, RegisterUser, UserList } from './models/user.model';
import { Observable, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly USERS_KEY = 'users';
	private readonly CURRENT_USER_KEY = 'currentUser';

	private readonly _user = signal<User | null>(null);

	constructor() {
		try {
			const user = JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY) as string);
			this._user.set(user);
		} catch (e) {
			//
		}
	}

	get currentUser() {
		return this._user.asReadonly();
	}

	get isLoggedIn() {
		return this._user() !== null;
	}

	public register(user: RegisterUser) {
		const users = this._getUsers();

		return new Observable<RegisterUser>((observer) => {
			if (!users[user.username]) {
				users[user.username] = user;
				localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
				observer.next(user);
			} else {
				observer.error('Username already exists.');
			}
		}).pipe(switchMap((user) => this.login(user.username, user.password)));
	}

	public login(username: string, password: string) {
		const users = this._getUsers();
		return new Observable<User>((observer) => {
			const user = users[username];
			if (user && user.password === password) {
				localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
				this._user.set(user);
				observer.next(user);
			} else {
				observer.error('Invalid username or password.');
			}
		});
	}

	public logout() {
		return new Observable<boolean>((observer) => {
			localStorage.removeItem(this.CURRENT_USER_KEY);
			observer.next(true);
		});
	}

	private _getUsers() {
		let users: UserList = {};
		try {
			const _users = JSON.parse(localStorage.getItem(this.USERS_KEY) as string);
			if (_users) {
				users = _users;
			}
		} catch (e) {
			//
		}

		return users;
	}
}
