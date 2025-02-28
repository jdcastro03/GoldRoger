import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachTournamentComponent } from './coach-tournament.component';

describe('CoachTournamentComponent', () => {
  let component: CoachTournamentComponent;
  let fixture: ComponentFixture<CoachTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoachTournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
