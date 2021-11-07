import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-application',
  templateUrl: './pending-application.component.html',
  styleUrls: ['./pending-application.component.scss']
})
export class PendingApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  experienceColumns: string[] = ['universityName', 'educationLevel', 'field', 'examDate', 'actions'];
  experienceData = experienceData;

}


export interface Experience {
  company: string;
  date: string;
  title: string;
  status: string;
}


const experienceData: Experience[] = [
  { company: "SAT (new)", date: 'Pakistan', title: "1365,00", status: '22.10.2018' },
  { company: "SAT (new)", date: 'Pakistan', title: "1365,00", status: '22.10.2018' },
  { company: "SAT (new)", date: 'Pakistan', title: "1365,00", status: '22.10.2018' },
  { company: "SAT (new)", date: 'Pakistan', title: "1365,00", status: '22.10.2018' },

];

export interface internship {
  company: string;
  subject: string;
  duration: number;
}
const internshipData: internship[] = [
  { company: "SPS", subject: "Associate", duration: 4 },
  { company: "SPS", subject: "Associate", duration: 4 },
  { company: "SPS", subject: "Associate", duration: 4 },
  { company: "SPS", subject: "Associate", duration: 4 }
];