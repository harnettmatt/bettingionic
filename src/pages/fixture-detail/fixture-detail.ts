import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FriendsPage } from '../friends/friends';
import { UserServiceProvider } from '../../providers/user-service/user-service';


// Make an amount object that has the number value and the color. when you select
// a button, pass the amount object in. loop through the amounts, if it isn't the
// correct amount, set the default color. If it is the correct amount, set the
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
  amounts: any;
  selectedFriend: any;
  selectedFriendColor: any;
  friends: any;
  selectedFriendText: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, private events: Events) {
    this.selectedFriend = null;
    this.selectedFriendText = 'Select a Friend';
    this.selectedFriendColor = 'light';
    this.friends = null;
    this.fixture = navParams.get('fixture');
    this.betable1Photo = this.fixture.betable1.grayscalePhoto;
    this.betable2Photo = this.fixture.betable2.grayscalePhoto;
    this.amounts = [
      {value: 5,   color: 'light'},
      {value: 10,  color: 'light'},
      {value: 25,  color: 'light'},
      {value: 50,  color: 'light'},
      {value: 100, color: 'light'}
    ];
  }

  // ionViewDidEnter() {
  //   console.log(this.selectedFriend);
  //   if (this.selectedFriend){
  //     this.selectedFriendText = this.selectedFriend.first_name + ' ' + this.selectedFriend.last_name;
  //     this.selectedFriendColor = 'default';
  //   }
  // }

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

  selectAmount(amount) {
    for (var a in this.amounts){
      if (this.amounts[a].value == amount.value) {
        this.amounts[a].color = 'default';
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
          }
          this.events.unsubscribe('selectedFriendEvent');
        })
        this.navCtrl.push(FriendsPage);
      })
  }
}
