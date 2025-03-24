import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Offer} from "../interfaces/Offer";


@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = "http://localhost:8000/offers";


  constructor(private http: HttpClient) {}

  getOffers(filters: Offer): Observable<Offer[]> {
    let params = new HttpParams();

    // Recorremos cada clave del objeto filters y la agregamos a los parámetros si tiene valor
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<Offer[]>(this.apiUrl, { params });
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }
  deleteOffer(id: number): Observable<Offer>{
    return this.http.delete<Offer>(this.apiUrl);
  }
}