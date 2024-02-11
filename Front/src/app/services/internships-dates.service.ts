import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InternshipsDatesService {
  private baseUrl = AppComponent.baseUrl + '/internships-dates';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getInternshipsDates() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getInternshipDateById(internshipDateId: number) {
    return this.http.get(
      `${this.baseUrl}/id=${internshipDateId}`,
      this.httpOptions
    );
  }

  addInternshipDate(internshipDate: any) {
    return this.http.post(
      `${this.baseUrl}/new`,
      internshipDate,
      this.httpOptions
    );
  }

  updateInternshipDate(internshipDateId: number, newInternshipDate: any) {
    return this.http.put(
      `${this.baseUrl}/update/id=${internshipDateId}`,
      newInternshipDate,
      this.httpOptions
    );
  }

  deleteInternshipDate(internshipDateId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/id=${internshipDateId}`,
      this.httpOptions
    );
  }
}
