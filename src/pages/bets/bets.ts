import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html'
})
export class BetsPage {
  bets: Array<{homeTeam: string, visitorTeam: string, time: string, date: string}>;

  constructor(public navCtrl: NavController) {
    this.bets =[];
    for(let i = 1; i<9; i++) {
      this.bets.push({
        homeTeam: 'Home Team ' + i,
        visitorTeam: 'Visitor Team ' + i,
        time: i + ':00',
        date: i + '/' + i + '/200' + i
      })
    }
  }
}
