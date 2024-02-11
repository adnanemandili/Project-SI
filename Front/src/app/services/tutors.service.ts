import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  private baseUrl = AppComponent.baseUrl + '/tutors';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getTutors() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getTutorByTutorNumber(tutorNumber: number) {
    return this.http.get(
      `${this.baseUrl}/number=${tutorNumber}`,
      this.httpOptions
    );
  }

  addTutor(tutor: any) {
    return this.http.post(`${this.baseUrl}/new`, tutor, this.httpOptions);
  }

  updateTutor(tutorNumber: number, newTutor: any) {
    return this.http.put(
      `${this.baseUrl}/update/number=${tutorNumber}`,
      newTutor,
      this.httpOptions
    );
  }

  deleteTutor(tutorNumber: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/number=${tutorNumber}`,
      this.httpOptions
    );
  }
}
