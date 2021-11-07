import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdmissionsService } from './admissions/admissions.service';


@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		FlexLayoutModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatToolbarModule,
		MatNativeDateModule,
		DashboardRoutingModule,
		HttpClientModule
	],
	providers: [
		AdmissionsService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}],
	entryComponents: [],
	bootstrap: [LayoutComponent]
})
export class DashboardModule { }
