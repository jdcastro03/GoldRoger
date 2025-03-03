import { Component, Input, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { RefereeService } from 'src/app/services/referee.service';
import { RefereeDTO } from 'src/app/interfaces/RefereeDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizerService } from 'src/app/services/organizer.service';
import { UpdateMatchDateDTO } from 'src/app/interfaces/UpdateMatchDateDTO';

@Component({
  selector: 'app-organizer-tournament-form',
  templateUrl: './organizer-tournament-form.component.html',
  styleUrls: ['./organizer-tournament-form.component.css']
})
export class OrganizerTournamentFormComponent implements OnInit {
  @Output() formClosed = new EventEmitter<void>();
  @Input() matchId: number | null = null; // Recibimos el matchId del componente padre
  selectedRefereeId: number | null = null; // Para almacenar el árbitro seleccionado
  
  @Output() refereeAssigned = new EventEmitter<{ matchId: number, referee: RefereeDTO }>();
  @Output() matchDateUpdated = new EventEmitter<{ matchId: number, newDate: Date }>();

  assignmentDate: Date | null = null; // Para almacenar la fecha de asignación

  referees: RefereeDTO[] = []; // Propiedad para almacenar los árbitros

  constructor(private refereeService: RefereeService, private snackBar: MatSnackBar, private organizerService: OrganizerService) {}

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
    if (this.matchId && this.selectedRefereeId !== null) {
      console.log('matchId:', this.matchId); // Verifica el matchId
      console.log('selectedRefereeId:', this.selectedRefereeId); // Verifica el árbitro seleccionado
  
      // Verifica que referees esté correctamente cargado
      console.log('Lista de árbitros:', this.referees); // Verifica la lista de árbitros
  
      // Convertir selectedRefereeId a número para evitar problemas de tipo
      const selectedRefereeIdNumber = Number(this.selectedRefereeId);
  
      // Encuentra el árbitro seleccionado en la lista de árbitros
      const selectedReferee = this.referees.find(referee => referee.refereeId === selectedRefereeIdNumber);
  
      if (selectedReferee) {
        console.log('Árbitro encontrado:', selectedReferee); // Verifica que encontramos el árbitro correcto
  
        // Llamamos al servicio para asignar el árbitro
        this.refereeService.insertMatchReferee(this.matchId ?? 0, selectedRefereeIdNumber).subscribe(
          (success) => {
            if (success) {
              this.snackBar.open('Árbitro asignado correctamente', 'OK', { duration: 2000 });
              
              // Emitimos el evento con los datos reales del árbitro
              this.refereeAssigned.emit({ matchId: this.matchId ?? 0, referee: selectedReferee });
  
              
            } else {
              console.error('Error al asignar el árbitro');
            }
          },
          (error) => {
            console.error('Error en la asignación:', error);
          }
        );
      } else {
        console.log('Árbitro no encontrado en la lista');
      }
    } else {
      console.log('No se ha seleccionado un árbitro o no se ha especificado un matchId');
    }
  }

  //updatematchdate
  updateMatchDate(): void {
    if (this.matchId && this.assignmentDate) {
      const updateMatchDateDTO: UpdateMatchDateDTO = {
        matchId: this.matchId,
        newDate: this.assignmentDate
      };
  
      this.organizerService.updateMatchDate(updateMatchDateDTO).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('Fecha de partido actualizada correctamente', 'OK', { duration: 2000 });
  
            // Emitimos el evento con la fecha actualizada
            this.matchDateUpdated.emit({ matchId: this.matchId ?? 0, newDate: this.assignmentDate! });
  
          } else {
            console.error('Error al actualizar la fecha del partido');
          }
        },
        (error) => {
          console.error('Error al actualizar la fecha del partido:', error);
        }
      );
    } else {
      console.log('No se ha especificado un matchId o una fecha de asignación');
    }
  }
 
}
