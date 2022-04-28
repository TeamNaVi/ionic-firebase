/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
// login.page.ts
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage = '';

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder // signInBtn = document.getElementById('signIn'), // signUpBtn = document.getElementById('signUp'),
  ) // fistForm = document.getElementById('form1'),
  // secondForm = document.getElementById('form2'),
  // container = document.querySelector('.container')
  {
    // signInBtn.addEventListener('click', () => {
    //   container.classList.remove('right-panel-active');
    // });
    // signInBtn.addEventListener('click', () => {
    //   container.classList.remove('right-panel-active');
    // });
    // signUpBtn.addEventListener('click', () => {
    //   container.classList.add('right-panel-active');
    // });
    // fistForm.addEventListener('submit', (e) => e.preventDefault());
    // secondForm.addEventListener('submit', (e) => e.preventDefault());
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
    ],
  };

  loginUser(value) {
    this.authService.loginUser(value).then(
      (res) => {
        console.log(res);
        this.errorMessage = '';
        this.navCtrl.navigateForward('/dashboard');
      },
      (err) => {
        this.errorMessage = err.message;
      }
    );
  }

  goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  }
  goToHomePage() {
    this.navCtrl.navigateBack('/home');
  }
}
