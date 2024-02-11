import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private baseUrl = AppComponent.baseUrl + '/skills';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    })
  }

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) { }

  getSkills() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getSkillBySkillNumber(skillNumber: number) {
    return this.http.get(`${this.baseUrl}/number=${skillNumber}`, this.httpOptions);
  }

  addSkill(skill: any) {
    return this.http.post(`${this.baseUrl}/new`, skill, this.httpOptions);
  }

  updateSkill(skillNumber: number, newSkill: any) {
    return this.http.put(`${this.baseUrl}/update/number=${skillNumber}`, newSkill, this.httpOptions);
  }

  deleteSkill(skillNumber: number) {
    return this.http.delete(`${this.baseUrl}/delete/number=${skillNumber}`, this.httpOptions);
  }
}
