import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { AuthService } from '../../auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	mode = 'side';
	opened = true;
	minimized = false;
	navs = [
		{ name: 'Schedule', 'url': 'calender', 'icon': 'event' },
		{ name: 'Personal Info', 'url': 'personal-info', 'icon': 'folder_shared' },
		{ name: 'Family Information', 'url': 'family-info', 'icon': 'people' },
		{ name: 'Contact Information', 'url': 'contact-info', 'icon': 'contact_phone' },
		{ name: 'Education Information', 'url': 'education-info', 'icon': 'school' },
		{ name: 'Work Experience', 'url': 'work-experience', 'icon': 'business_center' },
		{ name: 'Academic Qualifications', 'url': 'acadamic-qualification', 'icon': 'book' },
		// {name:"Social Activities", "url": ".", "icon": "group_work"},
		{ name: 'Pending Applications', 'url': 'pending-application', 'icon': 'hourglass_empty' }
	];
	constructor(private mediaObserver: MediaObserver, private authService: AuthService) {
		this.mediaObserver.asObservable()
			.pipe(
				filter((changes: MediaChange[]) => changes.length > 0),
				map((changes: MediaChange[]) => changes[0])
			).subscribe((change: MediaChange) => {
				this.mode = this.getMode(change);
				this.opened = this.getOpened(change);
			});
		// .media$.subscribe((mediaChange: MediaChange) => {
		// 	this.mode = this.getMode(mediaChange);
		// 	this.opened = this.getOpened(mediaChange);
		// });
	}
	private getMode(mediaChange: MediaChange): string {
		// set mode based on a breakpoint
		if (this.mediaObserver.isActive('gt-sm')) {
			return 'side';
		} else {
			return 'over';
		}
	}

	// open/close as needed
	private getOpened(mediaChange: MediaChange): boolean {
		if (this.mediaObserver.isActive('gt-sm')) {
			return true;
		} else {
			return false;
		}
	}
	logout() {
		this.authService.logout();
	}
	ngOnInit() {
	}

}
