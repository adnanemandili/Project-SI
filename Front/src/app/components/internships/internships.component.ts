import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { InternshipsService } from '../../services/internships.service';
import { SkillsComponent } from '../skills/skills.component';
import { InternshipsDatesComponent } from '../internships-dates/internships-dates.component';
import { ProfessorsService } from '../../services/professors.service';
import { CompaniesService } from '../../services/companies.service';
import { StudentsService } from '../../services/students.service';
import { TutorsService } from '../../services/tutors.service';
import { PromoService } from '../../services/promo.service';

@Component({
  selector: 'app-internships',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.css',
})
export class InternshipsComponent implements OnInit {
  internshipForm = new FormGroup({
    promo: new FormControl(),
    promoNumber: new FormControl(),
    professorId: new FormControl(),
    tutorNumber: new FormControl(),
    siretNumber: new FormControl(),
    internshipType: new FormControl(),
    year: new FormControl(),
    appreciation: new FormControl(''),
  });

  displayedColumns: string[] = [
    'ID',
    'Promotion',
    'Numéro Promotion',
    'Etudiant',
    'Professeur ID',
    'Professeur',
    'Tuteur ID',
    'Tuteur',
    'Numéro SIRET',
    'Entreprise',
    'Type de Stage',
    'Année',
    'Appréciation',
    'Actions',
  ];

  internshipsList: any[] = [];
  promosList: any[] = [];
  studentsList: any[] = [];
  professorsList: any[] = [];
  companiesList: any[] = [];
  tutorsList: any[] = [];
  editMode = false;
  currentInternshipId: number = 0;

  constructor(
    private internshipsService: InternshipsService,
    private promosService: PromoService,
    private studentsService: StudentsService,
    private professorsService: ProfessorsService,
    private companiesService: CompaniesService,
    private tutorsService: TutorsService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInternships();
    this.getPromos();
    this.getStudents();
    this.getProfessors();
    this.getCompanies();
    this.getTutors();    
  }

  getInternships() {
    this.internshipsService.getInternships().subscribe({
      next: (data: any) => {
        this.internshipsList = data;
        this.internshipsList.forEach((internship: any) => {
          this.studentsService
            .getStudentByPromoAndPromoNumber(
              internship.promo,
              internship.promoNumber
            )
            .subscribe({
              next: (data: any) => {
                internship.student = data.firstName + ' ' + data.lastName;
              },
              error: (err) => {
                if (err.status === 403) {
                  this.tokenStorageService.logout();
                }
              },
            });
          this.professorsService
            .getProfessorById(internship.professorId)
            .subscribe({
              next: (data: any) => {
                internship.professor = data.firstName + ' ' + data.lastName;
              },
              error: (err) => {
                if (err.status === 403) {
                  this.tokenStorageService.logout();
                }
              },
            });
          this.companiesService
            .getCompanyBySiretNumber(internship.siretNumber)
            .subscribe({
              next: (data: any) => {
                internship.company = data.businessName;
              },
              error: (err) => {
                if (err.status === 403) {
                  this.tokenStorageService.logout();
                }
              },
            });
          this.tutorsService
            .getTutorByTutorNumber(internship.tutorNumber)
            .subscribe({
              next: (data: any) => {
                internship.tutor = data.firstName + ' ' + data.lastName;
              },
              error: (err) => {
                if (err.status === 403) {
                  this.tokenStorageService.logout();
                }
              },
            });
        });
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  getPromos() {
    this.promosService.getPromos().subscribe({
      next: (data: any) => {
        this.promosList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  getStudents() {
    this.studentsService.getStudents().subscribe({
      next: (data: any) => {
        this.studentsList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  getProfessors() {
    this.professorsService.getProfessors().subscribe({
      next: (data: any) => {
        this.professorsList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe({
      next: (data: any) => {
        this.companiesList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  getTutors() {
    this.tutorsService.getTutors().subscribe({
      next: (data: any) => {
        this.tutorsList = data;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.internshipsList = this.internshipsList.filter((internship) => {
        return (
          internship.firstName.toLowerCase().includes(keyWord) ||
          internship.lastName.toLowerCase().includes(keyWord)
        );
      });
    } else {
      this.getInternships();
    }
  }

  handleInternshipForm() {
    if (this.editMode) {
      this.updateInternship();
    } else {
      this.addInternship();
    }
  }

  handleUpdateInternship(internship: any) {
    this.editMode = true;
    this.currentInternshipId = internship.internshipId;
    this.internshipForm.patchValue(internship);
  }

  addInternship() {
    this.internshipsService.addInternship(this.internshipForm.value).subscribe({
      next: (data) => {
        this.getInternships();
        this.internshipForm.reset();
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  updateInternship() {
    this.internshipsService
      .updateInternship(this.currentInternshipId, this.internshipForm.value)
      .subscribe({
        next: (data) => {
          this.getInternships();
          this.internshipForm.reset();
          this.editMode = false;
        },
        error: (err) => {
          if (err.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  deleteInternship(internshipId: number) {
    this.internshipsService.deleteInternship(internshipId).subscribe({
      next: (data) => {
        this.getInternships();
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
