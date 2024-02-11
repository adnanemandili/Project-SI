import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { ProfessorsComponent } from './components/professors/professors.component';
import { InternshipsComponent } from './components/internships/internships.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { TutorsComponent } from './components/tutors/tutors.component';
import { InternshipsDatesComponent } from './components/internships-dates/internships-dates.component';
import { SkillsComponent } from './components/skills/skills.component';
import { PromosComponent } from './components/promos/promos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authenticate', component: AuthenticationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'professors', component: ProfessorsComponent },
  { path: 'promos', component: PromosComponent },
  { path: 'internships', component: InternshipsComponent },
  { path: 'internships-dates', component: InternshipsDatesComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'tutors', component: TutorsComponent },
];
