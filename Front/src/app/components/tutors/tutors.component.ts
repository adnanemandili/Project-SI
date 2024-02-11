import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TutorsService } from '../../services/tutors.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tutors.component.html',
  styleUrl: './tutors.component.css',
})
export class TutorsComponent implements OnInit {
  tutorForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    gender: new FormControl(''),
    tutorPhoneNumber: new FormControl(''),
    siretNumber: new FormControl()
  });

  displayedColumns: string[] = [
    'ID',
    'Prénom',
    'Nom',
    'Sexe',
    'Téléphone du Tuteur',
    'Numéro SIRET',
    'Entreprise',
    'Actions',
  ];

  tutorsList: any[] = [];
  companiesList: any[] = [];
  editMode = false;
  currentTutorNumber: number = 0;

  constructor(
    private tutorsService: TutorsService,
    private companiesService: CompaniesService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTutors();
    this.getCompanies();
  }

  getTutors() {
    return this.tutorsService.getTutors().subscribe({
      next: (data: any) => {
        this.tutorsList = data;
        this.tutorsList.forEach((tutor: any) => {
          this.companiesService
            .getCompanyBySiretNumber(tutor.siretNumber)
            .subscribe({
              next: (company: any) => {
                tutor.company = company.businessName;
              },
              error: (e) => {
                if (e.status === 403) {
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

  getCompanies() {
    return this.companiesService.getCompanies().subscribe({
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

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.tutorsList = this.tutorsList.filter((tutor) => {
        return (
          tutor.firstName.toLowerCase().includes(keyWord) ||
          tutor.lastName.toLowerCase().includes(keyWord)
        );
      });
    } else {
      this.getTutors();
    }
  }

  handleTutorForm() {
    if (this.editMode) {
      this.updateTutor();
    } else {
      this.addTutor();
    }
  }

  handleUpdateTutor(tutor: any) {
    this.editMode = true;
    this.currentTutorNumber = tutor.tutorNumber;
    this.tutorForm.patchValue(tutor);
  }

  addTutor() {
    if (this.tutorForm.valid) {
      this.tutorsService.addTutor(this.tutorForm.value).subscribe({
        next: (data) => {
          this.getTutors();
          this.tutorForm.reset();
        },
        error: (err) => {
          if (err.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
    } else {
      console.log('Invalid form');
    }
  }

  updateTutor() {
    if (this.tutorForm.valid) {
      this.tutorsService
        .updateTutor(this.currentTutorNumber, this.tutorForm.value)
        .subscribe({
          next: (data) => {
            this.getTutors();
            this.editMode = false;
            this.tutorForm.reset();
          },
          error: (err) => {
            if (err.status === 403) {
              this.tokenStorageService.logout();
            }
          },
        });
    } else {
      console.log('Invalid form');
    }
  }

  deleteTutor(tutorNumber: number) {
    this.tutorsService.deleteTutor(tutorNumber).subscribe({
      next: (data) => {
        this.getTutors();
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
