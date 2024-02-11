import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = AppComponent.baseUrl + '/students';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getStudentByName(lastName: string) {
    return this.http.get(`${this.baseUrl}/name=${lastName}`, this.httpOptions);
  }

  getStudents() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getStudentById(studentId: number) {
    return this.http.get(this.baseUrl + '/id=' + studentId, this.httpOptions);
  }

  getStudentByPromoAndPromoNumber(promo: number, promoNumber: string) {
    return this.http.get(
      `${this.baseUrl}/promo=${promo}&promoNumber=${promoNumber}`,
      this.httpOptions
    );
  }

  addStudent(student: any) {
    return this.http.post(this.baseUrl + '/new', student, this.httpOptions);
  }

  updateStudent(studentId: number, newStudent: any) {
    return this.http.put(
      this.baseUrl + '/update/id=' + studentId,
      newStudent,
      this.httpOptions
    );
  }

  deleteStudent(studentId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/id= ${studentId}`,
      this.httpOptions
    );
  }
}
