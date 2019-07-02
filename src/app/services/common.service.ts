import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../components/login/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  errorMessage: string = "";
  //userId: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router) { }

  async login(formData) {
    try {
      const data = await this.loginService.login(formData);
      if (data["error"]) {
        this.errorMessage = data["data"];
      } else {
        localStorage.setItem("access_token", data["token"]);
        this.router.navigateByUrl("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    return this.errorMessage;
  }

  findUser() {
    return this.http.get(`${environment.apiBase}/list_users`);
  }

}
