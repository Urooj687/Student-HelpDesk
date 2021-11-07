import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { AuthService } from '../../auth/auth.service';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	mode: string = 'side';
	opened: boolean = true;
	minimized: boolean = false;
	navs = [
		{name:"Dashboard", "dashboard": "dashboard", "icon": "dashboard"},
		{name:"Our Page", "url": "our-page", "icon": "web"},
		{name:"Admissions", "url": "admissions", "icon": "inbox"},
		{name: "Applicants", "url":"applicants", "icon": "contact_mail"},
		{name:"Conduct Tests", "url": "conduct-tests", "icon": "description"},
		{name: "Merit Generation", "url":"merit-generation", "icon": "settings_applications"}
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
