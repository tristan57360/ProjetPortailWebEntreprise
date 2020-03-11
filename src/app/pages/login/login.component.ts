import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { resolve } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isError;
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit() {
    this.isError = false;
  }
  onSubmit() {
    this.authService.SignIn(this.profileForm.value.email, this.profileForm.value.password).then(res => {}, err => {this.isError = true; } );
  }
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
}


