import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FacebookServiceProvider {

  user: any;
  fbToken: any;
  userPrmise: any;

  constructor(public http: Http) {
  }

  loadUser(accessToken) {
    const fields = 'id, email';
      return new Promise((resolve,reject) => {
        this.http.get('https://graph.facebook.com/me/?access_token='+accessToken+'&fields='+fields)
          .map(res => res.json())
          .subscribe(
            data => {resolve(data)},
            err => {reject(err)});
    });
  }
}
