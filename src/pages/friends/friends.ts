import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  selectedFriend: any;
  friends: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {

    this.friends = JSON.parse(window.localStorage.getItem('friends'));
  }

  selectFriend(friend) {
    this.selectedFriend = friend;
    window.localStorage.setItem('selectedFriend', this.selectedFriend);
    this.navCtrl.pop();
  }

}
