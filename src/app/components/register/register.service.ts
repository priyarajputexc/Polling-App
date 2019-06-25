import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(body) {
    return this.http.get(`${environment.apiBase}/add_user?username=${body.email}&password=${body.password}&role=${body.user}`).toPromise();
  }

}
