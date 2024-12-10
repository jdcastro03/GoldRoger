import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersStateService {
  private clickedPlayers: { [playerId: number]: { clickCount: number, clicked: boolean, redCardClicked: boolean } } = {};

  getClickedPlayers() {
    return this.clickedPlayers;
  }

  setClickedPlayers(clickedPlayers: { [playerId: number]: { clickCount: number, clicked: boolean, redCardClicked: boolean } }) {
    this.clickedPlayers = clickedPlayers;
  }
}