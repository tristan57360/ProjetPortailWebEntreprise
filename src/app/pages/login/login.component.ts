import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    console.warn(this.profileForm.value);
    this.router.navigate(['/dashboard']);
  }
  constructor(private fb: FormBuilder, private router: Router) { }
}


