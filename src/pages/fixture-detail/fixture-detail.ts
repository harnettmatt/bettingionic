import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixtureDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fixture-detail',
  templateUrl: 'fixture-detail.html',
})
export class FixtureDetailPage {
  fixture: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixture = navParams.get('fixture');
  }
}
