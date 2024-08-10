export interface User {
	username: string;
	email: string;
}

export interface RegisterUser {
	username: string;
	email: string;
	password: string;
}

export interface UserList {
	[key: string]: RegisterUser;
}
