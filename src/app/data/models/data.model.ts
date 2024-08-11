export interface Data {
	administered: number;
	people_vaccinated: number;
	country: string;
	population: number;
	sq_km_area: number;
	life_expectancy: string;
	elevation_in_meters: number;
	continent: string;
	abbreviation: string;
	location: string;
	iso: string;
	capital_city: string;
	lat: string;
	long: string;
	updated: string;
}

export type DataName = 'administered' | 'people_vaccinated' | 'population' | 'sq_km_area';

export interface DataToShow {
	name: DataName;
	show: boolean;
}
