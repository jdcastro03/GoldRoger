import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit(): void {
    // Recuperar datos del usuario desde localStorage
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
  }
}