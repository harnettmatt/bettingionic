import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookServiceProvider } from '../../providers/facebook-service/facebook-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FbloginPage } from '../fblogin/fblogin';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  fbAccessToken: any;
  accessToken: any;
  fbUser: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public facebookService: FacebookServiceProvider, public userService: UserServiceProvider) {

    navCtrl.setRoot(FbloginPage);


// this could be useful for mobile. But for web I think it is easier to just login each time for now.
  //   Promise.all([this.getFBUser, this.getUser])
  //     .then(function(results) {
  //       // redirect to home page
  //       this.fbUser = results[0];
  //       this.user = results[1];
  //       console.log('redirect to home page');
  //     })
  //     .catch(function (err) {
  //       navCtrl.setRoot(FbloginPage);
  //     });
  // }
  //
  // getFBUser() {
  //   this.fbAccessToken = window.localStorage.getItem('fbToken');
  //   return this.facebookService.refreshToken(this.fbAccessToken)
  //     .then(newFBToken => {this.facebookService.loadUser(this.fbAccessToken)})
  // }
  //
  // getUser() {
  //   this.accessToken = window.localStorage.getItem('internalTokenResponse');
  //   return this.userService.refreshToken(this.accessToken)
  //     .then(newToken => {this.userService.loadUser(this.accessToken)})
  }
}
