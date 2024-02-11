import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PromosComponent } from '../promos/promos.component';
import { StudentsService } from '../../services/students.service';
import { ProfessorsService } from '../../services/professors.service';
import { InternshipsService } from '../../services/internships.service';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;
  totalProfessors: number = 0;
  totalInternships: number = 0;
  totalCompanies: number = 0;

  constructor(
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
    private internshipsService: InternshipsService,
    private companiesService: CompaniesService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getProfessors();
    this.getInternships();
    this.getCompanies();
  }

  getStudents(): void {
    this.studentsService.getStudents().subscribe(
      (response: any) => {
        this.totalStudents = response.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProfessors(): void {
    this.professorsService.getProfessors().subscribe(
      (response: any) => {
        this.totalProfessors = response.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getInternships(): void {
    this.internshipsService.getInternships().subscribe(
      (response: any) => {
        this.totalInternships = response.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCompanies(): void {
    this.companiesService.getCompanies().subscribe(
      (response: any) => {
        this.totalCompanies = response.length;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
