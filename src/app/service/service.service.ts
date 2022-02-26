import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getBanksInfo(): Observable<any> {
    return this.http.get(`${environment.API_URL}/banksCurrency`);

  }

  postBanksInfo(data: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/banksCurrency`, data);
    
  }
}