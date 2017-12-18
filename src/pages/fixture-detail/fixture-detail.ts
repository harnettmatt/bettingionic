import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-fixture-detail',
  templateUrl: 'fixture-detail.html',
})
export class FixtureDetailPage {
  fixture: any;
  betable1Photo: any;
  betable2Photo: any;
  selectedBetable: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fixture = navParams.get('fixture');
    this.betable1Photo = this.fixture.betable1.grayscalePhoto;
    this.betable2Photo = this.fixture.betable2.grayscalePhoto;
  }

  selectBetable1() {
    this.betable1Photo = this.fixture.betable1.colorPhoto;
    this.betable2Photo = this.fixture.betable2.grayscalePhoto;
    this.selectedBetable = this.fixture.betable1;
  }

  selectBetable2() {
    this.betable2Photo = this.fixture.betable2.colorPhoto;
    this.betable1Photo = this.fixture.betable1.grayscalePhoto;
    this.selectedBetable = this.fixture.betable2;
  }
}
