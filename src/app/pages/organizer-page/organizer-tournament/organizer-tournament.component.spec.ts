import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTournamentComponent } from './organizer-tournament.component';

describe('OrganizerTournamentComponent', () => {
  let component: OrganizerTournamentComponent;
  let fixture: ComponentFixture<OrganizerTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerTournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
