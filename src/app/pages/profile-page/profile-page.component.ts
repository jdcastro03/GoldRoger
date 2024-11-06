import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/services/player.service';
import { RefereeService } from 'src/app/services/referee.service';
import { OrganizerService } from 'src/app/services/organizer.service';
import { CoachService } from 'src/app/services/coach.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserRequestDTO } from 'src/app/interfaces/updateUserRequestDTO';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userForm: FormGroup;
  user: any;
  isEditing: boolean = false;
  originalUserData: any;

  positions: string[] = [
    'Portero (PO)', 'Defensa Izquierdo (DFI)', 'Defensa Central (DFC)', 'Defensa Derecho (DFD)',
    'Medio Central (MC)', 'Medio Volante Izquierdo (MVI)', 'Medio Volante Derecho (MVD)',
    'Medio Izquierdo (MI)', 'Medio Derecho (MD)', 'Medio Centro Ofensivo (MCO)',
    'Media Punta (MP)', 'Delantero Central (DC)', 'Extremo Derecho (ED)', 'Extremo Izquierdo (EI)'
  ];

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private refereeService: RefereeService,
    private organizerService: OrganizerService,
    private coachService: CoachService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: [{ value: '', }, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]{3,11}$/)]],
      lastName: [{ value: '', }, [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]{3,11}$/)]],
      email: [{ value: '', }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/)]],
      username: [{ value: '', }, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/)]],
      playerPosition: [{ value: '', disabled: true }, Validators.required],
      licenseNumber: [{ value: '', disabled: true }, Validators.required],
      organizationName: [{ value: '', disabled: true }, Validators.required],
      coachLicenseNumber: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;

    

    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      username: this.user.username,
    });

    this.checkUserType(this.user.userType, this.user.userId);
  }

  checkUserType(userType: number, userId: number): void {
    switch (userType) {
      case 1:
        this.getPlayerPosition(userId);
        this.userForm.get('playerPosition')?.enable();
        break;
      case 2:
        this.getRefereeLicenseNumber(userId);
        this.userForm.get('licenseNumber')?.enable();
        break;
      case 3:
        this.getOrganizerName(userId);
        this.userForm.get('organizationName')?.enable();
        break;
      case 4:
        this.getCoachLicenseNumber(userId);
        this.userForm.get('coachLicenseNumber')?.enable();
        break;
      default:
        break;
    }
  }

  getPlayerPosition(playerId: number): void {
    this.playerService.getPlayerPositionById(playerId).subscribe(
      (position: string) => {
        this.userForm.patchValue({ playerPosition: position });
      },
      error => {
        console.error('Error al obtener la posición del jugador:', error.message);
      }
    );
  }

  getRefereeLicenseNumber(refereeId: number): void {
    this.refereeService.getRefereeLicenseNumberById(refereeId).subscribe(
      (licenseNumber: string) => {
        this.userForm.patchValue({ licenseNumber: licenseNumber });
      },
      error => {
        console.error('Error al obtener el número de licencia del árbitro:', error.message);
      }
    );
  }

  getOrganizerName(organizerId: number): void {
    this.organizerService.getOrganizerNameById(organizerId).subscribe(
      (organizationName: string) => {
        this.userForm.patchValue({ organizationName: organizationName });
      },
      error => {
        console.error('Error al obtener el nombre del organizador:', error.message);
      }
    );
  }

  getCoachLicenseNumber(coachId: number): void {
    this.coachService.getCoachLicenseNumberById(coachId).subscribe(
      (coachLicenseNumber: string) => {
        this.userForm.patchValue({ coachLicenseNumber: coachLicenseNumber });
      },
      error => {
        console.error('Error al obtener el número de licencia del entrenador:', error.message);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.originalUserData = { ...this.user };
    if (this.isEditing) {
      this.userForm.enable();
    } else {
      this.userForm.patchValue({
        firstName: this.originalUserData.firstName,
        lastName: this.originalUserData.lastName,
        email: this.originalUserData.email,
        username: this.originalUserData.username,
        playerPosition: this.originalUserData.playerPosition || '',
        licenseNumber: this.originalUserData.licenseNumber || '',
        organizationName: this.originalUserData.organizationName || '',
        coachLicenseNumber: this.originalUserData.coachLicenseNumber || ''
      });
      this.userForm.markAsPristine();
      this.checkUserType(this.user.userType, this.user.userId);
    }
  }

  isFormValid(): boolean {
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'username'];
    
    // Verifica que el formulario esté modificado y que solo los campos especificados estén válidos
    const allFieldsValid = fieldsToValidate.every(field => 
      this.userForm.get(field)?.valid
    );
  
    return this.userForm.dirty && allFieldsValid;
  }

  onSubmit(){
    if (this.isFormValid()) {
      const formValues = this.userForm.value;
     const requestDTO: UpdateUserRequestDTO = {
      userId: this.user.userId,
      username: formValues.username,
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      position: formValues.playerPosition || null,
      organizationName: formValues.organizationName || null,
    };
    if (this.user.userType === 2) {
      requestDTO.licenseNumber = formValues.licenseNumber || null;
    } else if (this.user.userType === 4) {
      requestDTO.licenseNumber = formValues.coachLicenseNumber || null;
    }

      this.userService.updateUser(this.user.userId, requestDTO).subscribe(
        () => {
          this.snackBar.open('Usuario actualizado', 'Cerrar', {
            duration: 2000,
          });
       this.user = { ...this.user, ...requestDTO };
          localStorage.setItem('user', JSON.stringify(this.user));
          this.toggleEdit();
          
        },
        error => {
          console.error('Error al actualizar el usuario:', error.message);
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
            duration: 2000,
          });
        }
      );

  }
}
  
  }