import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompaniesService } from '../../services/companies.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { TutorsComponent } from '../tutors/tutors.component';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, TutorsComponent],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
})
export class CompaniesComponent implements OnInit {
  companyForm = new FormGroup({
    siretNumber: new FormControl(),
    legalForm: new FormControl(''),
    businessName: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(),
    tutorPhoneNumber: new FormControl(''),
    fax: new FormControl(''),
    contact: new FormControl(''),
    contactPhoneNumber: new FormControl(''),
    email: new FormControl(''),
  });

  displayedColumns: string[] = [
    'Numéro SIRET',
    'Forme Juridique',
    'Raison Sociale',
    'Adresse',
    'Ville',
    'Code Postal',
    'Téléphone du Tuteur',
    'Fax',
    'Contact',
    'Téléphone du Contact',
    'Email',
    'Actions',
  ];
  companiesList: any[] = [];
  editMode = false;
  currentSiretNumber: number = 0;

  constructor(
    private companiesService: CompaniesService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    return this.companiesService.getCompanies().subscribe({
      next: (data: any) => {
        this.companiesList = data;
      },
      error: (e: any) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handleSearch(event: any) {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord) {
      this.companiesList = this.companiesList.filter((entreprise: any) => {
        return entreprise.businessName.toLowerCase().includes(keyWord);
      });
    } else {
      this.getCompanies();
    }
  }

  getCompanyBySiretNumber(siretNumber: number) {
    return this.companiesService
      .getCompanyBySiretNumber(siretNumber)
      .subscribe({
        next: (data: any) => console.log(data),
        error: (e: any) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  getCompanyByBusinessName(businessName: string) {
    return this.companiesService
      .getCompanyByBusinessName(businessName)
      .subscribe({
        next: (data: any) => console.log(data),
        error: (e: any) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  handleCompanyForm() {
    if (this.editMode) {
      this.updateCompany();
    } else {
      this.addCompany();
    }
  }

  handleUpdateCompany(entreprise: any) {
    this.editMode = true;
    this.currentSiretNumber = entreprise.siretNumber;
    this.companyForm.patchValue(entreprise);
  }

  addCompany() {
    if (this.companyForm.valid) {
      this.companiesService.addCompany(this.companyForm.value).subscribe({
        next: (data: any) => {
          this.getCompanies();
          this.companyForm.reset();
        },
        error: (e: any) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
    } else {
      console.log('invalid form');
    }
  }

  updateCompany() {
    this.companiesService
      .updateCompany(this.currentSiretNumber, this.companyForm.value)
      .subscribe({
        next: (data: any) => {
          this.getCompanies();
          this.editMode = false;
          this.companyForm.reset();
        },
        error: (e: any) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  deleteCompany(siretNumber: number) {
    this.companiesService.deleteCompany(siretNumber).subscribe({
      next: (data: any) => {
        this.getCompanies();
      },
      error: (e: any) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
