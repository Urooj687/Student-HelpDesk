import { Component, OnInit } from '@angular/core';
import { EducationInfo, EducationInfoService } from './education-info.service';

@Component({
	selector: 'app-education-info',
	templateUrl: './education-info.component.html',
	styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {
	educations: Array<EducationInfo>;
	constructor(private educationService: EducationInfoService) { }

	ngOnInit() {
		this.educationService.list().subscribe(
			res => {
				this.educations = res;
			},
			err => {
				console.log(err);
			}
		)
	}

}
