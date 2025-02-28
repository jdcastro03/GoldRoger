import { Component } from '@angular/core';
import { MatchRefereeDTO } from 'src/app/interfaces/MatchRefereeDTO';
import { RefereeService } from 'src/app/services/referee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-referee-page',
  templateUrl: './referee-page.component.html',
  styleUrl: './referee-page.component.css'
})
export class RefereePageComponent {

  matchReferees: MatchRefereeDTO[] = [];


  constructor(private refereeService: RefereeService, private router: Router) { }


  
  ngOnInit(): void {
    this.getMatchesByRefereeId();
  }


  navigateToMatchDetails(matchId: number): void {
    this.router.navigate(['/match', matchId]);
    console.log('Navigating to tournament detail:', matchId);
    //inserta en el local storage el torunament
    


    

  }



  
  getMatchesByRefereeId(): void {
    this.refereeService.getMatchesByRefereeId(1).subscribe({
      next: (matches) => {
        this.matchReferees = matches;
      },
      error: (err) => {
        console.error('Error al obtener los partidos del árbitro:', err);
      }
    });
  }

}
