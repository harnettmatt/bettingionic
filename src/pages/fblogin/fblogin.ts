import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var window: any;
declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-fblogin',
  templateUrl: 'fblogin.html',
})
export class FbloginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
              console.log(response)
              // handle the user info here
            }
        }));
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FbloginPage');
  }

}
