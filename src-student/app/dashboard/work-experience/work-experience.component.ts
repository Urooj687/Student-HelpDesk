import { Component, OnInit } from '@angular/core';
import { WorkExperienceService, WorkExperience } from './work-experience.service';
import { InternshipExperienceService, InternshipExperience } from './internship-experience.service';

@Component({
	selector: 'app-work-experience',
	templateUrl: './work-experience.component.html',
	styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
	public hasInternship: boolean = false;
	experienceColumns: string[] = ['company', 'date', 'title', 'status', 'actions'];
	experienceData: Array<WorkExperience>;
	internshipColumns: string[] = ['company', 'subject', 'duration', 'actions']
	internshipData: Array<InternshipExperience>;

	constructor(private workExperienceService: WorkExperienceService, private internshipExperienceService: InternshipExperienceService) { }

	ngOnInit() {
		this.workExperienceService.list().subscribe(res => {
			this.experienceData = res;
		},
			err => {
				console.log(err);
			})
		this.internshipExperienceService.list().subscribe(res => {
			this.internshipData = res;
			if (this.internshipData.length > 0)
				this.hasInternship = true;
		})

	}
}