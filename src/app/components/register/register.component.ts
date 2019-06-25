import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/password.validator';
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  apiInProgress: boolean;
  errorMessage: string = "";
  registerForm: FormGroup;

  constructor(
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$")])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(`^(?=^.{4,8}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&;*()_+}{"":'?\/<.>,])(?!.*\\s).*$`)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required
      ])],
      user: ['', Validators.required]
    },
      { validator: passwordValidator });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  async onRegister(formData) {
    this.apiInProgress = true;
    try {
      const data = await this.registerService.register(formData);
      if (data["error"]) {
        this.errorMessage = data["message"];
      } else {
        this.commonService.login(formData);
      }
      this.apiInProgress = false;
    } catch (error) {
      console.error(error);
      this.apiInProgress = false;
    }
  }

  
}
