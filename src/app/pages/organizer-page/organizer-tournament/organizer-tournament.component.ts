import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizerService } from 'src/app/services/organizer.service';

@Component({
  selector: 'app-organizer-tournament',
  templateUrl: './organizer-tournament.component.html',
  styleUrl: './organizer-tournament.component.css'
})
export class OrganizerTournamentComponent {
  tournamentId: number | undefined;


  constructor(private route: ActivatedRoute, private organizerService: OrganizerService) {}


  ngOnInit(): void {
    // Obtiene el tournamentId de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    this.tournamentId = id !== null ? +id : undefined;

  }

}