import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

declare var window: any;
declare var FB: any;

@IonicPage()
@Component({
  selector: 'page-fblogin',
  templateUrl: 'fblogin.html',
})
export class FbloginPage {
  user: any;
  accessToken: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
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
              this.accessToken = response['authResponse']['accessToken']
              this.loadUser();
              // DATA
                // First Last Name
                // Profile Picture
                // Friends
            }
        }));
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FbloginPage');
  }

  loadUser() {
    if (this.user) {
      // already loaded data
      return Promise.resolve(this.user);
    }

    // don't have the data yet
    const fields = 'id, name, picture'
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.get('https://graph.facebook.com/me/?access_token='+this.accessToken+'&fields='+fields)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.user = data;
          console.log(data);
          resolve(this.user);
        });
    });
  }


}
