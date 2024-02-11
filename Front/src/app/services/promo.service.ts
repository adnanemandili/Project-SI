import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {
  private baseUrl = AppComponent.baseUrl + '/promos';
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenStorageService.getToken(),
    }),
  };

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getPromos() {
    return this.http.get(`${this.baseUrl}/list`, this.httpOptions);
  }

  getPromoById(promoId: number) {
    return this.http.get(
      `${this.baseUrl}/id=${promoId}`,
      this.httpOptions
    );
  }

  getPromoByYear(year:number) {
    return this.http.get(
      `${this.baseUrl}/year=${year}`,
      this.httpOptions
    );
  }

  addPromo(promo: any) {
    return this.http.post(`${this.baseUrl}/new`, promo, this.httpOptions);
  }

  updatePromo(promoId: number, newPromo: any) {
    return this.http.put(
      `${this.baseUrl}/update/id=${promoId}`,
      newPromo,
      this.httpOptions
    );
  }

  deletePromo(promoId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/id=${promoId}`,
      this.httpOptions
    );
  }
}
