import { Component, OnInit } from '@angular/core';
import { EducationInfoService, EducationInfo } from '../education-info.service';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../shared/countries.service';
import { CommonService } from '../../shared/common.service';
import { Observable } from 'rxjs';
import { CustomValidators } from '../../shared/custom-validators.service';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-add-education',
	templateUrl: './add-education.component.html',
	styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {

	constructor(
		private educationInfoService: EducationInfoService,
		private activeRoute: ActivatedRoute,
		private countriesService: CountriesService,
		private commonService: CommonService,
		private customValidators: CustomValidators) { }
	form: FormGroup;
	educationInfo: EducationInfo;
	public editingId: string = null;
	countries: string[] = [];
	states: string[] = [];
	cities: string[] = [];
	filteredCities: Observable<string[]>;
	filteredCountries: Observable<string[]>;
	filteredStates: Observable<string[]>;
	majorFieldList: Object[] = [{ "name": "General (No education field)", "value": "general" }];
	ngOnInit() {
		this.form = this.educationInfoService.createForm();
		this.editingId = this.activeRoute.snapshot.paramMap.get("id");
		if (this.editingId != null) {
			this.educationInfoService.get(this.editingId).subscribe(
				res => {
					this.form.patchValue(res);
					this.onEducationTypeChanged();
				}
			)
		}
		this.countriesService.list().subscribe(res => {
			this.countries = res;
			this.enableFilters();
			this.form.get('country').clearValidators();
			this.form.get('country').setValidators([this.customValidators.arrayValidator(this.countries), Validators.required]);
		});
		this.form.get('grade.gradeType').valueChanges.subscribe(value=>{
			const gradeControl = this.form.get('grade.total');
			if(value == 'gpa'){
				gradeControl.setValue(4);
				gradeControl.disable();
			}
			else if(value == 'fiveGrade'){
				gradeControl.setValue(5);
				gradeControl.disable();
			}
			else if(value == 'sixGrade'){
				gradeControl.setValue(6);
				gradeControl.disable();
			}
			else{
				gradeControl.enable();
			}
		})
	}
	submit(form: FormGroup) {
		console.log(form.value);
		this.educationInfo = Object.assign({}, form.getRawValue());
		if (this.editingId == null) {
			this.educationInfoService.add(this.educationInfo).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
		else {
			this.educationInfoService.edit(this.editingId, this.educationInfo).subscribe(
				res => { console.log(res) },
				err => { }
			);
		}
	}
	onStateFocus() {
		this.countriesService.states(this.form.get('country').value).subscribe(res => {
			this.states = res;
			this.form.get('state').clearValidators();
			this.form.get('state').setValidators([Validators.required, this.customValidators.arrayValidator(this.states), Validators.required]);
			this.filteredStates = this.commonService.watchAndFilter(this.form.get('state'), this.states);
		}, err => {

		})
	}
	onCityFocus() {
		this.countriesService.cities(this.form.get('country').value, this.form.get('state').value).subscribe(res => {
			this.cities = res;
			this.form.get('city').clearValidators();
			this.form.get('city').setValidators([Validators.required, this.customValidators.arrayValidator(this.cities), Validators.required]);
			this.filteredCities = this.commonService.watchAndFilter(this.form.get('city'), this.cities);
		}, err => {

		})
	}
	enableFilters() {
		this.filteredCountries = this.commonService.watchAndFilter(this.form.get('country'), this.countries);
	}
	onEducationTypeChanged() {
		const educationType = this.form.get('educationType').value;
		switch (educationType) {
			case 'secondary':
				this.majorFieldList = [
					{ "name": "Science/Natural Sciences", "value": "sciences" },
					{ "name": "Literary", "value": "literary" },
					{ "name": "Language", "value": "language" },
					{ "name": "Math & Literature", "value": "math & literature" },
					{ "name": "General (No education field)", "value": "general" },
				]
				break;
			case 'tertiary':
				this.majorFieldList = [
					{ "name": "Adult Development", "value": "adult development" },
					{ "name": "Accounting", "value": "accounting" },
					{ "name": "Animal Biology", "value": "animal biology" },
					{ "name": "Animal Science", "value": "animal science" },
					{ "name": "Anthropology", "value": "anthropology" },
					{ "name": "Applied Human Nutrition", "value": "applied human nutrition" },
					{ "name": "Art History", "value": "art history" },
					{ "name": "Biochemistry", "value": "biochemistry" },
					{ "name": "Biodiversity", "value": "biodiversity" },
					{ "name": "Biological and Medical Physics", "value": "biological and medical physics" },
					{ "name": "Biological and Pharmaceutical Chemistry", "value": "biological and pharmaceutical chemistry" },
					{ "name": "Biological Engineering", "value": "biological engineering" },
					{ "name": "Biological Science", "value": "biological science" },
					{ "name": "Biomedical Engineering", "value": "biomedical engineering" },
					{ "name": "Biomedical Toxicology", "value": "biomedical toxicology" },
					{ "name": "Bio-Medical Science", "value": "bio-medical science" },
					{ "name": "Chemical Physics", "value": "chemical physics" },
					{ "name": "Chemistry", "value": "chemistry" },
					{ "name": "Child, Youth and Family", "value": "child, youth and family" },
					{ "name": "Classical Studies", "value": "classical studies" },
					{ "name": "Computer Engineering", "value": "computer engineering" },
					{ "name": "Computer Science", "value": "computer science" },
					{ "name": "Criminal Justice and Public Policy", "value": "criminal justice and public policy" },
					{ "name": "Crop, Horticulture and Turfgrass Sciences", "value": "crop, horticulture and turfgrass Sciences" },
					{ "name": "Ecology", "value": "ecology" },
					{ "name": "Economics", "value": "economics" },
					{ "name": "Engineering Systems and Computing", "value": "engineering systems and computing" },
					{ "name": "English", "value": "english" },
					{ "name": "Environment and Resource Management", "value": "environment and resource management" },
					{ "name": "Environmental Biology (B.Sc.)", "value": "environmental biology (b.sc.)" },
					{ "name": "Environmental Economics and Policy", "value": "environmental economics and policy" },
					{ "name": "Environmental Engineering", "value": "environmental engineering" },
					{ "name": "Environmental Geomatics", "value": "environmental geomatics" },
					{ "name": "Environmental Governance", "value": "environmental governance" },
					{ "name": "Environmental Management", "value": "environmental management" },
					{ "name": "Environmental Sciences", "value": "environmental sciences" },
					{ "name": "Equine Management", "value": "equine management" },
					{ "name": "European Studies", "value": "european studies" },
					{ "name": "Food, Agricultural and Resource Economics", "value": "food, agricultural and resource Economics" },
					{ "name": "Food and Agricultural Business", "value": "food and agricultural business" },
					{ "name": "Food Industry Management", "value": "food industry management" },
					{ "name": "Food Science", "value": "food science" },
					{ "name": "French Studies/Études Françaises", "value": "french studies/études françaises" },
					{ "name": "General (B.A.)", "value": "general (b.a.)" },
					{ "name": "Geography", "value": "geography" },
					{ "name": "History", "value": "history" },
					{ "name": "Honours Agriculture", "value": "honours agriculture" },
					{ "name": "Hospitality and Tourism Management ", "value": "hospitality and tourism management " },
					{ "name": "Human Kinetics", "value": "human kinetics" },
					{ "name": "International Development", "value": "international development" },
					{ "name": "Major To Be Determined (B.A)", "value": "major to be determined (b.a)" },
					{ "name": "Management", "value": "management" },
					{ "name": "Management Economics and Finance", "value": "management economics and finance" },
					{ "name": "Marine & Freshwater Biology", "value": "marine & freshwater biology" },
					{ "name": "Marketing Management", "value": "marketing management" },
					{ "name": "Mathematical Economics", "value": "mathematical economics" },
					{ "name": "Mathematical Science", "value": "mathematical science" },
					{ "name": "Mechanical Engineering", "value": "mechanical engineering" },
					{ "name": "Microbiology", "value": "microbiology" },
					{ "name": "Molecular Biology & Genetics", "value": "molecular biology & genetics" },
					{ "name": "Music", "value": "music" },
					{ "name": "Nanoscience", "value": "nanoscience" },
					{ "name": "Neuroscience", "value": "neuroscience" },
					{ "name": "Nutritional &Nutraceutical Sciences", "value": "nutritional &nutraceutical sciences" },
					{ "name": "Philosophy", "value": "philosophy" },
					{ "name": "Physical Science", "value": "physical science" },
					{ "name": "Physics", "value": "physics" },
					{ "name": "Plant Science", "value": "plant science" },
					{ "name": "Political Science", "value": "political science" },
					{ "name": "Psychology", "value": "psychology" },
					{ "name": "Public Management", "value": "public management" },
					{ "name": "Real Estate and Housing", "value": "real estate and housing" },
					{ "name": "Spanish & Hispanic Studies", "value": "spanish & hispanic studies" },
					{ "name": "Sociology", "value": "sociology" },
					{ "name": "Software Engineering", "value": "software engineering" },
					{ "name": "Studio Art", "value": "studio art" },
					{ "name": "Theatre Studies", "value": "theatre studies" },
					{ "name": "Theoretical Physics", "value": "theoretical physics" },
					{ "name": "Undeclared (B.Comm)", "value": "undeclared (b.comm)" },
					{ "name": "Undeclared (B.Eng)", "value": "undeclared (b.eng)" },
					{ "name": "Water Resources Engineering", "value": "water resources engineering" },
					{ "name": "Wild Life Biology and Conservation", "value": "wild life biology and conservation" },
					{ "name": "Zoology", "value": "zoology" },
				]
				break;
			default:
				this.majorFieldList = [{ "name": "General (No education field)", "value": "general" }]
		}
	}

}
