import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, private events: Events) {

    this.friends = JSON.parse(window.localStorage.getItem('friends'));
  }

  selectFriend(friend) {
    this.selectedFriend = friend;
    this.navCtrl.pop().then(() => this.events.publish('selectedFriendEvent', this.selectedFriend));
  }

}
