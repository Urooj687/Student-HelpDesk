import { Component, OnInit } from '@angular/core';
import { AcadamicQualificationService, AcadamicQualification } from './acadamic-qualification.service';

@Component({
	selector: 'app-acadamic-qualification',
	templateUrl: './acadamic-qualification.component.html',
	styleUrls: ['./acadamic-qualification.component.scss']
})
export class AcadamicQualificationComponent implements OnInit {
	qualificationData: Array<AcadamicQualification>
	constructor(private acadamicQualificationService: AcadamicQualificationService) { }
	ngOnInit() {
		this.acadamicQualificationService.list().subscribe(
			res=>{
				this.qualificationData = res;
			},
			err=>{
				console.log(err);
			}
		)
	}
	experienceColumns: string[] = ['examName', 'country', 'grade', 'examDate', 'actions'];

}