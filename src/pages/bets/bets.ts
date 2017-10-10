import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BetServiceProvider} from '../../providers/bet-service/bet-service';

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html'
})
export class BetsPage {
  bets: any;
  fixtures: any;

  constructor(public betService: BetServiceProvider) {
    this.fixtures = []
    this.fetchFixtures();
    this.fetchBets();
  }

  fetchFixtures(){
    for(let i = 1; i<9; i++) {
      this.fixtures.push({
        homeTeam: 'Home Team ' + i,
        visitorTeam: 'Visitor Team ' + i,
        time: i + ':00',
        date: i + '/' + i + '/200' + i
      })
    }
  }

  fetchBets(){
    this.betService.load().then(data => {
      this.bets = data;
    });
  }
}
