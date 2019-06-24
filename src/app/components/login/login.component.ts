import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  apiInProgress: boolean;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$")])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        Validators.pattern("^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$")
      ])]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async onSubmit(formData) {
    console.log(formData);
    this.apiInProgress = true;
    try {
      const data = await this.loginService.login(formData);
      if( data["error"]){
        this.errorMessage = data["data"];
      }
      this.apiInProgress = false;
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }

}
