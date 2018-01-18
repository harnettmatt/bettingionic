import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { BetServiceProvider } from '../../providers/bet-service/bet-service';


// Make an amount object that has the number value and the color. when you select
// a button, pass the amount object in. loop through the amounts, if it isn't the
// correct amount, set the default color. If it is the correct amount, set the
declare var window: any;
// color to the selected color

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
  selectedAmount: any;
  amounts: any;
  selectedFriend: any;
  selectedFriendColor: any;
  friends: any;
  selectedFriendText: any;
  unselectedBetable: any;
  betReady: any;
  betReadyText:any;
  betReadyColor: any;
  bet: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, public betService: BetServiceProvider, private events: Events) {
    this.bet = null;
    this.selectedFriend = null;
    this.selectedFriendText = 'Select a Friend';
    this.betReady = false;
    this.betReadyText = 'Finish Making Selections';
    this.betReadyColor = 'danger';
    this.selectedFriendColor = 'light';
    this.friends = null;
    this.fixture = navParams.get('fixture');
    this.selectedBetable = null;
    this.unselectedBetable = null;
    this.betable1Photo = this.fixture.betable1.grayscalePhoto;
    this.betable2Photo = this.fixture.betable2.grayscalePhoto;
    this.selectedAmount = null;
    this.amounts = [
      {value: 5,   color: 'light'},
      {value: 10,  color: 'light'},
      {value: 25,  color: 'light'},
      {value: 50,  color: 'light'},
      {value: 100, color: 'light'}
    ];
  }

  selectBetable1() {
    this.betable1Photo = this.fixture.betable1.colorPhoto;
    this.betable2Photo = this.fixture.betable2.grayscalePhoto;
    this.selectedBetable = this.fixture.betable1;
    this.unselectedBetable = this.fixture.betable2;
    this.checkBetReady();
  }

  selectBetable2() {
    this.betable2Photo = this.fixture.betable2.colorPhoto;
    this.betable1Photo = this.fixture.betable1.grayscalePhoto;
    this.selectedBetable = this.fixture.betable2;
    this.unselectedBetable = this.fixture.betable1;
    this.checkBetReady();
  }

  selectAmount(amount) {
    for (var a in this.amounts){
      if (this.amounts[a].value == amount.value) {
        this.amounts[a].color = 'default';
        this.selectedAmount = this.amounts[a];
        this.checkBetReady();
      }
      else {
        this.amounts[a].color = 'light';
      }
    }
  }

  selectFriend() {
    this.userService.loadUsers().then(
      friends => {
        this.friends = friends;
        window.localStorage.setItem('friends', JSON.stringify(this.friends));
        this.events.subscribe('selectedFriendEvent', (selectedFriend) => {
          this.selectedFriend = selectedFriend;
          if (this.selectedFriend){
            this.selectedFriendText = this.selectedFriend.first_name + ' ' + this.selectedFriend.last_name;
            this.selectedFriendColor = 'default';
            this.checkBetReady();
          }
          this.events.unsubscribe('selectedFriendEvent');
        })
        this.navCtrl.push(FriendsPage);
      })
  }

  makeBet() {
    if (this.betReady) {
      let user = JSON.parse(window.localStorage.getItem('user'));
      console.log(user);
      let accessToken = JSON.parse(window.localStorage.getItem('internalTokenResponse'));
      this.bet = {
        "proposerID"     : user.id,
        "acceptorID"     : this.selectedFriend.id,
        "amount"         : this.selectedAmount.value,
        "fixtureID"      : this.fixture.id,
        "status"         : 'O',
        "proposerSideID" : this.selectedBetable.id,
        "acceptorSideID" : this.unselectedBetable.id
      };
      console.log(this.bet);
      this.betService.makeBet(this.bet, accessToken['access_token']).then(bet => {this.navCtrl.pop()});
    }
  }

  checkBetReady() {
    if (this.selectedFriend && this.selectedBetable && this.selectedAmount) {
      this.betReady = true;
      this.betReadyColor = 'secondary';
      this.betReadyText = 'Make Bet';
    }
  }
}
