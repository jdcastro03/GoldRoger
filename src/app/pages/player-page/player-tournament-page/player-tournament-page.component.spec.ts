import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTournamentPageComponent } from './player-tournament-page.component';

describe('PlayerTournamentPageComponent', () => {
  let component: PlayerTournamentPageComponent;
  let fixture: ComponentFixture<PlayerTournamentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTournamentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTournamentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
