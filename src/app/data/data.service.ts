import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Data } from './models/data.model';
import { CountryName } from './models/country.model';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	private readonly API_URL = environment.apiURL;

	constructor(private readonly http: HttpClient) {}

	getData(country: CountryName) {
		return this.http.get<Data>(`${this.API_URL}?country=${country}`);
	}
}
