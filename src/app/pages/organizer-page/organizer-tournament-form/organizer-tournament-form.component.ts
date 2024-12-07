import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { RefereeService } from 'src/app/services/referee.service';
import { RefereeDTO } from 'src/app/interfaces/RefereeDTO';

@Component({
  selector: 'app-organizer-tournament-form',
  templateUrl: './organizer-tournament-form.component.html',
  styleUrls: ['./organizer-tournament-form.component.css']
})
export class OrganizerTournamentFormComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();
  @Input() matchId: number | null = null; // Recibimos el matchId del componente padre
  selectedRefereeId: number | null = null; // Para almacenar el árbitro seleccionado

  referees: RefereeDTO[] = []; // Propiedad para almacenar los árbitros

  constructor(private refereeService: RefereeService) {}

  ngOnInit(): void {
    this.getAllReferees(); // Llamar a getAllReferees cuando se inicializa el componente
  }

  closeForm(): void {
    this.formClosed.emit();
  }

  getAllReferees(): void {
    this.refereeService.getAllReferees().subscribe(
      (referees: RefereeDTO[]) => {
        this.referees = referees; // Almacenar los árbitros obtenidos en la propiedad 'referees'
      },
      (error) => {
        console.error('Error al cargar los árbitros:', error);
      }
    );
  }

  assignReferee(): void {
    if (this.matchId && this.selectedRefereeId) {
      console.log('matchId:', this.matchId); // Verifica el matchId
      console.log('selectedRefereeId:', this.selectedRefereeId); // Verifica el árbitro seleccionado
  
      // Llamamos al servicio para asignar el árbitro
      this.refereeService.insertMatchReferee(this.matchId, this.selectedRefereeId).subscribe(
        (success) => {
          if (success) {
            console.log('Árbitro asignado correctamente');
            this.closeForm(); // Puedes cerrar el formulario después de la asignación
          } else {
            console.error('Error al asignar el árbitro');
          }
        },
        (error) => {
          console.error('Error en la asignación:', error);
        }
      );
    } else {
      console.log('No se ha seleccionado un árbitro o no se ha especificado un matchId');
    }
  }
}
