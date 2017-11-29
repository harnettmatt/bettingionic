import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceProvider {
  data: any;
  newUser: any;
  exchangeTokenResponse: any;

  constructor(public http: Http) {
  }

  loadUsers() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:8000/users/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(this.data);
        });
    });
  }

  createUser() {
    if (this.newUser) {
      return Promise.resolve(this.newUser);
    }

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    let user = {
      "username"   : "test_username1",
      "email"      : "test_email@gmail.com",
      "password"   : "test_password",
      "first_name" : "test_first_name",
      "last_name"  : "test_last_name",
      "wallet"     : 50
    }

    return new Promise(resolve => {
      this.http.post('http://127.0.0.1:8000/users/', user, options)
        .map(res => res.json())
        .subscribe(data => {
          this.newUser = data;
          console.log(data);
          resolve(this.newUser);
        });
    });
  }

  exchangeFBToken(fbToken) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });

    let grantType = 'convert_token';
    let clientID = 'uyGdgzWIqDW63MDetIbRu0xXn1Et4VRhSU2h2lNR';
    let clientSecret = 'B6mi5Yfv5oa4fyUvHQsj2lNVKjvHsZ90nzARcah4xpXagDIIEHjVFQCgwc2XIpSFAp14K4mdwkgzSYS5dUAd7X3fNAPz9R87GGzQKzyutgRprx0Qbm4bVnVEYyrpNuk7';

    return new Promise(resolve => {
      this.http.post('http://127.0.0.1:8000/auth/convert-token?grant_type=convert_token&client_id='+clientID+'&client_secret='+clientSecret+'&backend=facebook&token='+fbToken, options)
        .map(res => res.json())
        .subscribe(data => {
          this.exchangeTokenResponse = data;
          console.log(data);
          resolve(this.exchangeTokenResponse);
        });
    });
  }

}
