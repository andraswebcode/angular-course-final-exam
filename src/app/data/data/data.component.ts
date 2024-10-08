import { AfterViewInit, Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Country } from '../models/country.model';
import { DataService } from '../data.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataToShow } from '../models/data.model';
import { JsonPipe } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';

@Component({
	selector: 'app-data',
	standalone: true,
	imports: [MatSidenavModule, MatFormFieldModule, MatCheckboxModule],
	templateUrl: './data.component.html',
	styleUrl: './data.component.scss'
})
export class DataComponent implements OnInit, AfterViewInit {
	@ViewChild('chartCanvas') chartCanvas?: ElementRef<HTMLCanvasElement>;

	private _chart!: Chart<'bar'>;

	countries: Country[] = [
		{
			name: 'Hungary',
			selected: true
		},
		{
			name: 'France',
			selected: false
		},
		{
			name: 'Slovakia',
			selected: true
		},
		{
			name: 'Slovenia',
			selected: false
		},
		{
			name: 'Austria',
			selected: true
		},
		{
			name: 'Romania',
			selected: false
		}
	];

	dataToShow: DataToShow[] = [
		{
			name: 'population',
			show: true
		},
		{
			name: 'administered',
			show: true
		},
		{
			name: 'people_vaccinated',
			show: true
		},
		{
			name: 'sq_km_area',
			show: false
		}
	];

	get chartData() {
		return {
			labels: this.countries
				.filter((country) => country.selected)
				.map((country) => country.name),
			datasets: this.dataToShow
				.filter((data) => data.show)
				.map((data) => ({
					label: data.name,
					data: this.countries
						.filter((country) => country.selected)
						.map((country) => country.data?.[data.name] || 0)
				}))
		};
	}

	constructor(
		private readonly dataService: DataService,
		private readonly destroyRef: DestroyRef
	) {}

	public ngOnInit() {
		this.countries.forEach((country, index) => {
			this.selectCountry(index, country.selected);
		});
		Chart.register(...registerables);
	}

	public ngAfterViewInit() {
		if (!this.chartCanvas?.nativeElement) {
			return;
		}

		const ctx = this.chartCanvas.nativeElement.getContext('2d');

		if (!ctx) {
			return;
		}

		if (this._chart) {
			this._updateChart();
		} else {
			this._chart = new Chart(ctx, {
				type: 'bar',
				data: this.chartData
			});
		}
	}

	public selectCountry(index: number, selected: boolean) {
		const country = this.countries[index];
		if (country) {
			country.selected = selected;
			if (selected) {
				this.dataService
					.getData(country.name)
					.pipe(
						tap((data) => {
							country.data = data;
							this._updateChart();
						}),
						takeUntilDestroyed(this.destroyRef)
					)
					.subscribe();
			} else {
				this._updateChart();
			}
		}
	}

	public selectData(index: number, show: boolean) {
		const data = this.dataToShow[index];
		if (data) {
			data.show = show;
		}
		this._updateChart();
	}

	private _updateChart() {
		if (this._chart) {
			this._chart.data = this.chartData;
			this._chart.update();
		}
	}
}
