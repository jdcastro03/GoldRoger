import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/modules/app-routing.module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginVisible: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Value', this.loginForm.value);
    }
  }

  navigateToRegister() {
    // Aquí puedes manejar la navegación a la página de registro
    // Por ejemplo, si usas Angular Router:
    
    this.router.navigate(['/register']);
  }
  handleOutsideClick() {
    this.router.navigate(['/home']);
  }
}
