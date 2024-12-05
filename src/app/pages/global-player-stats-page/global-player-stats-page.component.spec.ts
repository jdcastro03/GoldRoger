import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPlayerStatsPageComponent } from './global-player-stats-page.component';

describe('GlobalPlayerStatsPageComponent', () => {
  let component: GlobalPlayerStatsPageComponent;
  let fixture: ComponentFixture<GlobalPlayerStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalPlayerStatsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalPlayerStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
