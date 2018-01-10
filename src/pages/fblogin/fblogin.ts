import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { FacebookServiceProvider } from '../../providers/facebook-service/facebook-service';
import { BetsPage } from '../bets/bets';

declare var window: any;
declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-fblogin',
  templateUrl: 'fblogin.html',
})
export class FbloginPage {
  user: any;
  fbUser: any;
  fbAccessToken: any;
  internalTokenResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public userService: UserServiceProvider, public facebookService: FacebookServiceProvider) {

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {

      FB.init({
          appId            : '1576286162417361',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.10'
      });
      FB.AppEvents.logPageView();

      FB.Event.subscribe('auth.statusChange', (response => {
        if (response.status === 'connected') {
          this.fbAccessToken = response['authResponse']['accessToken'];
          if (!this.fbAccessToken) throw 'could not connect to facebook';
          // localstorageService.store('fbToken', this.fbAccessToken);
          window.localStorage.setItem('fbToken', this.fbAccessToken);
          Promise.all([this.getUser(), this.facebookService.loadUser(this.fbAccessToken)])
            .then(results => {
              this.user = results[0];
              this.fbUser = results[1];
              this.internalTokenResponse = JSON.parse(window.localStorage.getItem('internalTokenResponse'));
              console.log(this.internalTokenResponse);
              console.log(this.internalTokenResponse['access_token']);
              this.userService.updateUserFBData(this.internalTokenResponse['access_token'], this.fbUser)
                .then(user => {
                  this.user = user;
                  window.localStorage.setItem('user', JSON.stringify(this.user));
                  navCtrl.setRoot(BetsPage);
                })
            })
        }
      }));
    }
  }

  getUser() {
    this.internalTokenResponse = window.localStorage.getItem('internalTokenResponse');
    if (this.internalTokenResponse === null) {
      return this.userService.exchangeFBToken(this.fbAccessToken)
        .then(newToken => {this.userService.loadUser(newToken['access_token'])})
    }
    else {
      this.internalTokenResponse = JSON.parse(this.internalTokenResponse);
      return this.userService.refreshToken(this.internalTokenResponse['refresh_token'])
        .then(newToken => {this.userService.loadUser(newToken['access_token'])})
    }
  }
}
