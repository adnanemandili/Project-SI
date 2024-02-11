import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  skillForm = new FormGroup({
    code: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
  });

  displayedColumns: string[] = [
    'ID',
    'Code',
    'Libellé',
    'Description',
    'Actions',
  ];

  skillsList: any[] = [];
  editMode = false;
  currentSkillNumber: number = 0;

  constructor(
    private skillsService: SkillsService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills() {
    return this.skillsService.getSkills().subscribe({
      next: (data: any) => {
        this.skillsList = data;
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
    this.skillsList = this.skillsList.filter((skill) => {
      return (
        skill.code.toLowerCase().includes(keyWord) ||
        skill.label.toLowerCase().includes(keyWord) ||
        skill.description.toLowerCase().includes(keyWord)
      );
    });
  }

  handleSkillForm() {
    if (this.editMode) {
      this.updateSkill();
    } else {
      this.addSkill();
    }
  }

  handleUpdateSkill(skill: any) {
    this.editMode = true;
    this.currentSkillNumber = skill.skillNumber;
    this.skillForm.patchValue(skill);
  }

  addSkill() {
    if (this.skillForm.valid) {
      this.skillsService.addSkill(this.skillForm.value).subscribe({
        next: (data: any) => {
          this.getSkills();
          this.skillForm.reset();
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

  updateSkill() {
    if (this.skillForm.valid) {
      this.skillsService
        .updateSkill(this.currentSkillNumber, this.skillForm.value)
        .subscribe({
          next: (data: any) => {
            this.getSkills();
            this.skillForm.reset();
            this.editMode = false;
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

  deleteSkill(skillNumber: number) {
    this.skillsService.deleteSkill(skillNumber).subscribe({
      next: (data: any) => {
        this.getSkills();
      },
      error: (err) => {
        if (err.status === 403) {
          this.tokenStorageService.logout();
        }
      },
    });
  }
}
