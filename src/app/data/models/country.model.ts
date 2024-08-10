import { Data } from './data.model';

export type CountryName = 'Hungary' | 'France' | 'Slovakia' | 'Slovenia' | 'Austria' | 'Romania';

export interface Country {
	name: CountryName;
	selected: boolean;
	data?: Data;
}
