import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { BetServiceProvider } from '../../providers/bet-service/bet-service';
import { FixtureServiceProvider } from '../../providers/fixture-service/fixture-service';
import { BetDetailPage } from '../bet-detail/bet-detail';
import { FixtureDetailPage } from '../fixture-detail/fixture-detail';

declare var window: any;

@Component({
  selector: 'page-bets',
  templateUrl: 'bets.html'
})
export class BetsPage {
  bets: any;
  fixtures: any;
  accessTokenResponse: any;
  fbAccessToken: any;

  constructor(public betService: BetServiceProvider, public fixtureService: FixtureServiceProvider, public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    this.fbAccessToken = window.localStorage.getItem('fbToken');
    this.accessTokenResponse = window.localStorage.getItem('internalTokenResponse');
    this.accessTokenResponse = JSON.parse(this.accessTokenResponse);
    Promise.all([this.fetchFixtures(), this.fetchBets()])
      .then(results => {
        this.fixtures = results[0];
        this.bets = results[1];
      });
  }

  fetchFixtures(){
    return this.fixtureService.load(this.accessTokenResponse['access_token'])
  }

  fetchBets(){
    return this.betService.load(this.accessTokenResponse['access_token'])
  }

  betDetail(bet) {
    this.navCtrl.push(BetDetailPage, {bet: bet});
  }

  fixtureDetail(fixture) {
    this.navCtrl.push(FixtureDetailPage, {fixture: fixture});
  }
}
