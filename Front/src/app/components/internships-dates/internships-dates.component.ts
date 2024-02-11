import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InternshipsDatesService } from '../../services/internships-dates.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-internships-dates',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './internships-dates.component.html',
  styleUrl: './internships-dates.component.css',
})
export class InternshipsDatesComponent implements OnInit {
  internshipsDatesForm = new FormGroup({
    internshipType: new FormControl(),
    year: new FormControl(),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  displayedColumns: string[] = [
    'ID',
    'Type de Stage',
    'Nombre de Semaines',
    'Année',
    'Date de Début',
    'Date de Fin',
    'Actions',
  ];

  internshipsDatesList: any[] = [];
  numberOfWeeksPerType: any[] = [
    { internshipType: '11', numberOfWeeks: 4 },
    { internshipType: '21', numberOfWeeks: 4 },
    { internshipType: '22', numberOfWeeks: 8 },
    { internshipType: '31', numberOfWeeks: 2 },
    { internshipType: '32', numberOfWeeks: 12 },
  ];
  editMode = false;
  currentInternshipDateId: number = 0;

  constructor(
    private internshipsDatesService: InternshipsDatesService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInternshipsDates();
  }

  getInternshipsDates() {
    this.internshipsDatesService.getInternshipsDates().subscribe({
      next: (internshipsDatesList: any) => {
        this.internshipsDatesList = internshipsDatesList;
        this.internshipsDatesList.forEach((internshipDate) => {
          internshipDate.numberOfWeeks = this.numberOfWeeksPerType.find(
            (numberOfWeeks) =>
              numberOfWeeks.internshipType === internshipDate.internshipType.toString()
          ).numberOfWeeks;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value;
    if (keyWord) {
      this.internshipsDatesList = this.internshipsDatesList.filter(
        (internshipDate) => internshipDate.year.toString().includes(keyWord)
      );
    } else {
      this.getInternshipsDates();
    }
  }

  handleInternshipDateForm() {
    if (this.editMode) {
      this.updateInternshipDate();
    } else {
      this.addInternshipDate();
    }
  }

  handleUpdateInternshipDate(internshipDate: any) {
    this.editMode = true;
    this.currentInternshipDateId = internshipDate.internshipDateId;
    this.internshipsDatesForm.patchValue(internshipDate);
  }

  addInternshipDate() {
    if (this.internshipsDatesForm.valid) {
      const startDate = new Date(
        this.internshipsDatesForm.value.startDate!
      ).getTime();
      const numberOfWeeks = this.numberOfWeeksPerType.find(
        (numberOfWeeks) =>
          numberOfWeeks.internshipType ===
          this.internshipsDatesForm.value.internshipType
      );
      const endDate = new Date(
        startDate + numberOfWeeks!.numberOfWeeks * 7 * 24 * 60 * 60 * 1000
      );
      this.internshipsDatesForm.patchValue({
        endDate: endDate.toISOString().slice(0, 10),
      });
      setTimeout(() => {
        this.internshipsDatesService
          .addInternshipDate(this.internshipsDatesForm.value)
          .subscribe({
            next: (data) => {
              this.getInternshipsDates();
              this.internshipsDatesForm.reset();
            },
            error: (err) => {
              console.log(err);
            },
          });
      }, 300);
    }
  }

  updateInternshipDate() {
    this.internshipsDatesService
      .updateInternshipDate(
        this.currentInternshipDateId,
        this.internshipsDatesForm.value
      )
      .subscribe({
        next: (data) => {
          this.getInternshipsDates();
          this.internshipsDatesForm.reset();
          this.editMode = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteInternshipDate(internshipDateId: number) {
    this.internshipsDatesService
      .deleteInternshipDate(internshipDateId)
      .subscribe({
        next: (data) => {
          this.getInternshipsDates();
        },
        error: (err) => {
          if (err.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }
}
