import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bet-detail',
  templateUrl: 'bet-detail.html',
})
export class BetDetailPage {
  bet: any;
  user: any;
  betable1Photo: any;
  betable2Photo: any;
  userRole: any;
  friend: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bet = navParams.get('bet');
    console.log(this.bet);
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.determineSides();
  }

  determineSides() {
    if (this.user.id == this.bet.proposer.id) {
      this.friend = this.bet.acceptor
      if (this.bet.proposerSide.id == this.bet.fixture.betable1.id) {
        this.betable1Photo = this.bet.proposerSide.colorPhoto;
        this.betable2Photo = this.bet.acceptorSide.grayscalePhoto;
      }
      else {
        this.betable1Photo = this.bet.acceptorSide.grayscalePhoto;
        this.betable2Photo = this.bet.proposerSide.colorPhoto;
      }
    }
    else {
      this.friend = this.bet.acceptor
      if (this.bet.acceptorSide.id == this.bet.fixture.betable1.id) {
        this.betable1Photo = this.bet.acceptorSide.colorPhoto;
        this.betable2Photo = this.bet.proposerSide.grayscalePhoto;
      }
      else {
        this.betable1Photo = this.bet.proposerSide.grayscalePhoto;
        this.betable2Photo = this.bet.acceptorSide.colorPhoto;
      }
    }
  }
}
