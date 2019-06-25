import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.get(`${environment.apiBase}/login?username=${body.email}&password=${body.password}`).toPromise();
  }
  
}
