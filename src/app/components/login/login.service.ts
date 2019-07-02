import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body) {
    return this.http.get(`${environment.apiBase}/login?username=${body.email}&password=${body.password}`).toPromise();
  }

  loggedIn() {
    return !!localStorage.getItem('access_token');
  }
  
}
