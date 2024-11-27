import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStatsPageComponent } from './player-stats-page.component';

describe('PlayerStatsPageComponent', () => {
  let component: PlayerStatsPageComponent;
  let fixture: ComponentFixture<PlayerStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerStatsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
