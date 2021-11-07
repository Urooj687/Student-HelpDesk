import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataVisualizerService } from './data-visualizer.service';
import { InputBase } from './input-base';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-data-visualizer',
	templateUrl: './data-visualizer.component.html',
	styleUrls: ['./data-visualizer.component.scss']
})
export class DataVisualizerComponent implements OnInit {
	inputs: InputBase<{}>[];
	page: string;
	isLoadingResults = false;
	form: FormGroup;
	constructor(private route: ActivatedRoute, private dvService: DataVisualizerService) {
		this.page = this.route.snapshot.data.page;
		const inputs = this.dvService.getInputData(this.page);
		this.form = this.dvService.toFormGroup(inputs);
		this.inputs = inputs;
	}
	data = data;
	isRateLimitReached = false;
	resultsLength = 10;
	// form: FormGroup;
	displayedColumns: string[] = ['title', 'start', 'end', 'actions'];
	ngOnInit() { }
	onSubmit() {
		this.dvService.postData(this.form, this.page).subscribe(
			res => {
				console.log(res);
			},
			err => {
				console.error(err);
			});
	}

}


const data = [
	{
		'categories': [
			'Software Engineering'
		],
		'_id': '5cd6851a7155ce06fc71c75b',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'abc',
		'charges': 500,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd6872d7155ce06fc71c75e',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'lp',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687437155ce06fc71c75f',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687467155ce06fc71c760',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687477155ce06fc71c761',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687587155ce06fc71c762',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687587155ce06fc71c763',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687587155ce06fc71c764',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687677155ce06fc71c765',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687687155ce06fc71c766',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd687687155ce06fc71c767',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'pq',
		'charges': 300,
		'start': '2019-05-17T19:00:00.000Z',
		'end': '2019-05-18T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Computer Sceince'
		],
		'_id': '5cd679ea7ccd23410012f861',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 'test',
		'charges': 100,
		'start': '2019-05-10T19:00:00.000Z',
		'end': '2019-05-20T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Machine Learning'
		],
		'_id': '5cd685747155ce06fc71c75c',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 're',
		'charges': 200,
		'start': '2019-05-09T19:00:00.000Z',
		'end': '2019-05-27T19:00:00.000Z',
		'__v': 0
	},
	{
		'categories': [
			'Machine Learning'
		],
		'_id': '5cd685b17155ce06fc71c75d',
		'instituteId': '5ccecc17f7a70b4d6c464b0f',
		'title': 're',
		'charges': 200,
		'start': '2019-05-09T19:00:00.000Z',
		'end': '2019-05-27T19:00:00.000Z',
		'__v': 0
	}
];
