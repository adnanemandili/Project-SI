import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TokenStorageService } from '../../services/token-storage.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  studentForm = new FormGroup({
    // studentId: new FormControl(),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(),
    phoneNumber: new FormControl(''),
    promo: new FormControl(),
    promoNumber: new FormControl(''),
    mention: new FormControl(''),
  });

  displayedColumns: string[] = [
    'ID',
    'Prénom',
    'nom',
    'Email',
    'Sexe',
    'Date de naissance',
    'Adresse',
    'Ville',
    'Code Postal',
    'Téléphone',
    'Promo',
    'Numéro promo',
    'Mention',
    'Actions',
  ];
  studentsList: any[] = [];
  currentstudentId = 0;
  editMode = false;
  student: any;

  constructor(
    private studentsService: StudentsService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    return this.studentsService.getStudents().subscribe({
      next: (data: any) => {
        this.studentsList = data;
      },
      error: (e: { status: number }) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.studentsList = this.studentsList.filter((student: any) => {
        const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`;
        return fullName.includes(keyWord);
      });
    } else {
      this.getStudents();
    }
  }

  getStudentByName(lastName: string) {
    return this.studentsService.getStudentByName(lastName).subscribe({
      next: (data: any) => console.log(data),
      error: (e: { status: number }) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleStudentForm() {
    if (this.editMode) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }

  handleUpdateStudent(student: any) {
    this.editMode = true;
    this.currentstudentId = student.studentId;
    this.studentForm.patchValue(student);
  }

  addStudent() {
    if (this.studentForm.valid) {
      this.studentsService.addStudent(this.studentForm.value).subscribe({
        next: (data: any) => {
          this.getStudents();
        },
        error: (e: { status: number }) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
    } else {
      console.log('invalid form');
    }
  }

  updateStudent() {
    this.studentsService
      .updateStudent(this.currentstudentId, this.studentForm.value)
      .subscribe({
        next: (data: any) => {
          this.getStudents();
          this.editMode = false;
        },
        error: (e: { status: number }) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  deleteStudent(studentId: number) {
    this.studentsService.deleteStudent(studentId).subscribe({
      next: (data: any) => {
        this.studentsList = this.studentsList.filter((student: any) => {
          return student.studentId !== studentId;
        });
      },
      error: (e: { status: number }) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
