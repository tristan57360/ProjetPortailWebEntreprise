import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  ngOnInit() {
  }
  onSubmit() {
    this.authService.SignIn(this.profileForm.value.email, this.profileForm.value.password);
  }
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
}


