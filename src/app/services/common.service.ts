import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../components/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  errorMessage: string = "";


  constructor(
    private loginService: LoginService,
    private router: Router) { }

  async login(formData){
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

}
