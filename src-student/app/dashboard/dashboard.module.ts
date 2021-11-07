import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { LayoutComponent } from './layout/layout.component';
import { CalenderComponent, DialogOverviewExampleDialog } from './calender/calender.component';
import { CalendarModule, DateAdapter  } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PendingApplicationComponent } from './pending-application/pending-application.component';
import { PersonalInfoService } from './personal-info/personal-info.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from '../auth/token.interceptor';
import { FamilyInfoService } from './family-info/family-info.service';
import { ContactInfoService } from './contact-info/contact-info.service';
import { WorkExperienceService } from './work-experience/work-experience.service';
import { InternshipExperienceService } from './work-experience/internship-experience.service';
import { AcadamicQualificationService } from './acadamic-qualification/acadamic-qualification.service';
import { EducationInfoService } from './education-info/education-info.service';
import { CountriesService } from './shared/countries.service';
import { CustomValidators } from './shared/custom-validators.service';

@NgModule({
	declarations: [
		LayoutComponent,
		DialogOverviewExampleDialog,
		CalenderComponent,
		PendingApplicationComponent
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		FlexLayoutModule,
		DashboardRoutingModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		  }),
		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatStepperModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		HttpClientModule
	],
	providers: [
		PersonalInfoService,
		FamilyInfoService,
		ContactInfoService,
		DashboardRoutingModule,
		WorkExperienceService,
		InternshipExperienceService,
		AcadamicQualificationService,
		CountriesService,
		CustomValidators,
		EducationInfoService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}],
	entryComponents: [CalenderComponent, DialogOverviewExampleDialog],
	bootstrap: [LayoutComponent]
})
export class DashboardModule { }
