import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {BetServiceProvider} from '../../providers/bet-service/bet-service';
import {FixtureServiceProvider} from '../../providers/fixture-service/fixture-service';

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html'
})
export class BetsPage {
  bets: any;
  fixtures: any;

  constructor(public betService: BetServiceProvider, public fixtureService: FixtureServiceProvider) {
    this.fixtures = []
    this.fetchFixtures();
    this.fetchBets();
  }

  fetchFixtures(){
    this.fixtureService.load().then(data => {
      this.fixtures = data;
    });
  }

  fetchBets(){
    this.betService.load().then(data => {
      this.bets = data;
    });
  }
}
