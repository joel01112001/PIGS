import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Offer} from "../interfaces/Offer";


@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private apiUrl = "http://localhost:8000/offers";


  constructor(private http: HttpClient) {}

  getOffers(filters: Offer): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, offer);
  }
  deleteOffer(id: number): Observable<Offer>{
    return this.http.delete<Offer>(this.apiUrl);
  }
}