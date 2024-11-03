import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';
import { RefereeService } from 'src/app/services/referee.service';
import { OrganizerService } from 'src/app/services/organizer.service';
import { CoachService } from 'src/app/services/coach.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any;
  playerPosition: string = ''; // Almacena la posición del jugador{}
  licenseNumber: string = ''; // Almacena el número de licencia del árbitro
  organizationName: string = ''; // Almacena el nombre de la organización
  coachLicenseNumber: string = ''; // Almacena el número de licencia del entrenador
  isEditing: boolean = false; // Nueva propiedad para controlar el modo de edición
  positions: string[] = [
    'Portero (PO)', 'Defensa Izquierdo (DFI)', 'Defensa Central (DFC)', 'Defensa Derecho (DFD)',
    'Medio Central (MC)', 'Medio Volante Izquierdo (MVI)', 'Medio Volante Derecho (MVD)',
    'Medio Izquierdo (MI)', 'Medio Derecho (MD)', 'Medio Centro Ofensivo (MCO)',
    'Media Punta (MP)', 'Delantero Central (DC)', 'Extremo Derecho (ED)', 'Extremo Izquierdo (EI)'
  ];
  
  constructor(private playerService: PlayerService, private refereeService : RefereeService, private organizerService : OrganizerService, private coachService : CoachService) {}

  ngOnInit(): void {
    // Recuperar datos del usuario desde localStorage
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    
    // this.getPlayerPosition(this.user.userId); // Obtener la posición del jugador
    // this.getRefereeLicenseNumber(this.user.userId); // Obtener el número de licencia del árbitro
    //consolelog el userype de user
    if (this.user.userType === 1) {
      this.getPlayerPosition(this.user.userId); // Obtener la posición del jugador
    }else if (this.user.userType === 2) {
      this.getRefereeLicenseNumber(this.user.userId); // Obtener el número de licencia del árbitro
    }else if (this.user.userType === 3) {
      this.getOrganizerName(this.user.userId); // Obtener el nombre de la organización
    }else if (this.user.userType === 4) {
      this.getCoachLicenseNumber(this.user.userId); // Obtener el número de licencia del entrenador
    }
   
  }
  

 
  getPlayerPosition(playerId: number): void {
    this.playerService.getPlayerPositionById(playerId).subscribe(
      (position: string) => {
        this.playerPosition = position; // Asigna la posición al estado del componente
      },
      error => {
        console.error('Error al obtener la posición del jugador:', error.message);
        this.playerPosition = 'No disponible'; // Muestra un mensaje alternativo o maneja el error de otra manera
      }
    );
  }

  getRefereeLicenseNumber(refereeId: number): void {
    this.refereeService.getRefereeLicenseNumberById(refereeId).subscribe(
      (licenseNumber: string) => {
        this.licenseNumber = licenseNumber; // Asigna el número de licencia al estado del componente
      },
      error => {
        console.error('Error al obtener el número de licencia del árbitro:', error.message);
      }
    );
  }

  getOrganizerName(organizerId: number): void {
    this.organizerService.getOrganizerNameById(organizerId ).subscribe(
      (organizationName: string) => {
        this.organizationName = organizationName; // Asigna el nombre de la organización al estado del componente
      },
      error => {
        console.error('Error al obtener el nombre del organizador:', error.message);
      }
    );
  }

  getCoachLicenseNumber(coachId: number): void {
    this.coachService.getCoachLicenseNumberById(coachId).subscribe(
      (coachLicenseNumber: string) => {
        this.coachLicenseNumber = coachLicenseNumber; // Asigna el número de licencia del entrenador al estado del componente
      },
      error => {
        console.error('Error al obtener el número de licencia del entrenador:', error.message);
      }
    );
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Alterna el modo de edición
  }
  

  

}