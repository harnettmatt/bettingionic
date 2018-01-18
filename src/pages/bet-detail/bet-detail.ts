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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bet = navParams.get('bet');
  }
}
