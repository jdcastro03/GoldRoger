import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTournamentFormComponent } from './organizer-tournament-form.component';

describe('OrganizerTournamentFormComponent', () => {
  let component: OrganizerTournamentFormComponent;
  let fixture: ComponentFixture<OrganizerTournamentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerTournamentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerTournamentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
