import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { ProfessorsService } from '../../services/professors.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PromosComponent } from '../promos/promos.component';

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    CommonModule,
    PromosComponent,
  ],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.css',
})
export class ProfessorsComponent implements OnInit {
  professorForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(),
    schoolPhoneNumber: new FormControl(''),
    phoneNumber: new FormControl(''),
    hiringDate: new FormControl(''),
    leavingDate: new FormControl(''),
  });

  displayedColumns: string[] = [
    'ID',
    'Prénom',
    'Nom',
    'Email',
    'Sexe',
    'Adresse',
    'Ville',
    'Code Postal',
    'Téléphone école',
    'Téléphone domicile',
    'Date Emboche',
    'Date Depart',
    'Actions',
  ];
  professorsList: any[] = [];
  editMode = false;
  currentprofessorId: number = 0;

  constructor(
    private professorsService: ProfessorsService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors() {
    return this.professorsService.getProfessors().subscribe({
      next: (data: any) => {
        this.professorsList = data;
      },
      error: (e) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.professorsList = this.professorsList.filter((professor: any) => {
        const fullName = `${professor.firstName.toLowerCase()} ${professor.lastName.toLowerCase()}`;
        return fullName.includes(keyWord);
      });
    } else {
      this.getProfessors();
    }
  }

  // getProfessorByFirstAndLastName(firstName: string, lastName:string) {
  //   return this.professorsService.getProfessorByFirstAndLastName(firstName,lastName).subscribe({
  //     next: (data) =>{
  //       this.professor = data;
  //     },
  //     error: (e) => {
  //       if (e.status === 403) {
  //         this.tokenStorageService.logout();
  //       }
  //     },
  //   });
  // }

  getProfessorById(professorId: number) {
    return this.professorsService.getProfessorById(professorId).subscribe({
      next: (data) => console.log(data),
      error: (e) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleProfessorForm() {
    if (this.editMode) {
      this.updateProfessor();
    } else {
      this.addProfessor();
    }
  }

  handleUpdateProfessor(professor: any) {
    this.editMode = true;
    this.currentprofessorId = professor.professorId;
    this.professorForm.patchValue(professor);
  }

  addProfessor() {
    if (this.professorForm.valid) {
      this.professorsService.addProfessor(this.professorForm.value).subscribe({
        next: (data) => {
          this.getProfessors();
        },
        error: (e) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
    } else {
      console.log('invalid form');
    }
  }

  updateProfessor() {
    this.professorsService
      .updateProfessor(this.currentprofessorId, this.professorForm.value)
      .subscribe({
        next: (data) => {
          this.getProfessors();
          this.editMode = false;
        },
        error: (e) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  deleteProfessor(professorId: number) {
    this.professorsService.deleteProfessor(professorId).subscribe({
      next: (data) => {
        this.professorsList = this.professorsList.filter((professor: any) => {
          return professor.professorId !== professorId;
        });
      },
      error: (e) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
