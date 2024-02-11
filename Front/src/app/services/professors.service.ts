import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {
  private baseUrl = AppComponent.baseUrl + '/professors';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getProfessors() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getProfessorById(professorId: number) {
    return this.http.get(
      `${this.baseUrl}/id=${professorId}`,
      this.httpOptions
    );
  }

  getProfessorByFirstAndLastName(firstName: string , lastName:string) {
    return this.http.get(
      `${this.baseUrl}/name=${firstName}+${lastName}`,
      this.httpOptions
    );
  }

  addProfessor(professor: any) {
    return this.http.post(`${this.baseUrl}/new`, professor, this.httpOptions);
  }

  updateProfessor(professorId: number, newProfessor: any) {
    return this.http.put(
      `${this.baseUrl}/update/id=${professorId}`,
      newProfessor,
      this.httpOptions
    );
  }

  deleteProfessor(professorId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/id=${professorId}`,
      this.httpOptions
    );
  }
}
