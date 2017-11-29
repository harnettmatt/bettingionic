import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserServiceProvider } from '../../providers/user-service/user-service';

declare var window: any;
declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-fblogin',
  templateUrl: 'fblogin.html',
})
export class FbloginPage {
  user: any;
  fbAccessToken: any;
  internalTokenResponse: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public userService: UserServiceProvider) {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
        console.log("fbasyncinit")

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
              console.log(this.accessToken);
              this.internalTokenResponse = userService.exchangeFBToken(this.accessToken);
              // send id and token to internal api
              // if we find a user successfully
                // return the user
              // else
                // loadUser
              // this.user = userService.createUser();
              // console.log(this.user);
              // this.loadUser();
            }
        }));
    };
  }

  loadUser() {
    if (this.user) {
      return Promise.resolve(this.user);
    }

    const fields = 'id, name, picture'
    return new Promise(resolve => {
      this.http.get('https://graph.facebook.com/me/?access_token='+this.accessToken+'&fields='+fields)
        .map(res => res.json())
        .subscribe(data => {
          this.user = data;
          console.log(data);
          resolve(this.user);
        });
    });
  }
}
