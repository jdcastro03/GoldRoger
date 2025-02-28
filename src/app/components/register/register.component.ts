import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí maneja el registro del usuario
      console.log(this.registerForm.value);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  handleOutsideClick() {
    this.router.navigate(['/home']);
  }
}