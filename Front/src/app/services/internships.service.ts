import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InternshipsService {
  private baseUrl = AppComponent.baseUrl + '/internships';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getInternships() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getInternshipByInternshipId(internshipId: number) {
    return this.http.get(
      `${this.baseUrl}/id=${internshipId}`,
      this.httpOptions
    );
  }

  addInternship(internship: any) {
    return this.http.post(`${this.baseUrl}/new`, internship, this.httpOptions);
  }

  updateInternship(internshipId: number, newInternship: any) {
    return this.http.put(
      `${this.baseUrl}/update/id=${internshipId}`,
      newInternship,
      this.httpOptions
    );
  }

  deleteInternship(internshipId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/id=${internshipId}`,
      this.httpOptions
    );
  }
}
