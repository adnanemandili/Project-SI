import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PromoService } from '../../services/promo.service';
import { ProfessorsService } from '../../services/professors.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-promos',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './promos.component.html',
  styleUrl: './promos.component.css',
})
export class PromosComponent implements OnInit {
  promoForm = new FormGroup({
    year: new FormControl(2020),
    professorId: new FormControl(1),
    registredNumber: new FormControl(13),
    receiptsNumber: new FormControl(14),
  });

  displayedColumns: string[] = [
    'ID',
    'Année',
    'Professeur Id',
    'Professeur',
    'Nombre Inscrits',
    'Nombre Reçus',
    'Actions',
  ];
  promoList: any[] = [];
  professorsList: any[] = [];
  editMode = false;
  currentpromoId: number = 0;

  constructor(
    private promoService: PromoService,
    private professorsService: ProfessorsService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPromos();
    this.getProfessors();
  }

  getPromos() {
    return this.promoService.getPromos().subscribe({
      next: (data: any) => {
        this.promoList = data;
        this.promoList.forEach((promo: any) => {
          this.professorsService.getProfessorById(promo.professorId).subscribe({
            next: (data: any) => {
              promo.professor = data.firstName + ' ' + data.lastName; 
            },
            error: (e) => {
              if (e.status === 403) {
                this.tokenStorageService.logout();
              }
            },
          });
        });
      },
      error: (e) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
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
      this.promoList = this.promoList.filter((promo: any) => {
        return promo.year.toString().indexOf(keyWord) !== -1;
      });
    } else {
      this.getPromos();
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

  getPromoById(promoId: number) {
    return this.promoService.getPromoById(promoId).subscribe({
      next: (data) => console.log(data),
      error: (e) => {
        if (e.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }

  handlePromoForm() {
    if (this.editMode) {
      this.updatePromo();
    } else {
      this.addPromo();
    }
  }

  handleUpdatePromo(promo: any) {
    this.editMode = true;
    this.currentpromoId = promo.promoId;
    this.promoForm.patchValue(promo);
  }

  addPromo() {
    if (this.promoForm.valid) {
      this.promoService.addPromo(this.promoForm.value).subscribe({
        next: (data) => {
          this.getPromos();
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

  updatePromo() {
    this.promoService
      .updatePromo(this.currentpromoId, this.promoForm.value)
      .subscribe({
        next: (data) => {
          this.getPromos();
          this.editMode = false;
        },
        error: (e) => {
          if (e.status === 403) {
            this.tokenStorageService.logout();
          }
        },
      });
  }

  deletePromo(promoId: number) {
    this.promoService.deletePromo(promoId).subscribe({
      next: (data) => {
        this.promoList = this.promoList.filter((promo: any) => {
          return promo.promoId !== promoId;
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
