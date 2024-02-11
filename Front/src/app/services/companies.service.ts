import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private baseUrl = AppComponent.baseUrl + '/companies';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getCompanies() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getCompanyBySiretNumber(siretNumber: number) {
    return this.http.get(
      `${this.baseUrl}/siret=${siretNumber}`,
      this.httpOptions
    );
  }

  getCompanyByBusinessName(businessName: string) {
    return this.http.get(
      `${this.baseUrl}/name=${businessName}`,
      this.httpOptions
    );
  }

  addCompany(company: any) {
    return this.http.post(`${this.baseUrl}/new`, company, this.httpOptions);
  }

  updateCompany(siretNumber: number, newCompany: any) {
    return this.http.put(
      `${this.baseUrl}/update/siret=${siretNumber}`,
      newCompany,
      this.httpOptions
    );
  }

  deleteCompany(siretNumber: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/siret=${siretNumber}`,
      this.httpOptions
    );
  }
}
