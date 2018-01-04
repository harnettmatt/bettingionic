import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

declare var window: any;

@Injectable()
export class UserServiceProvider {
  data: any;
  newUser: any;
  user: any;
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
          resolve(this.data);
        });
    });
  }

  loadUser(accessToken) {
    if (this.user) {
      return Promise.resolve(this.user);
    }
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    });
    // headers.append('Content-Type', 'multipart/form-data');
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/me/', { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {resolve(data)},
          err => {reject(err)});
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
          resolve(this.newUser);
        });
    });
  }

  exchangeFBToken(fbToken) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let clientID = 'uyGdgzWIqDW63MDetIbRu0xXn1Et4VRhSU2h2lNR';
    let clientSecret = 'B6mi5Yfv5oa4fyUvHQsj2lNVKjvHsZ90nzARcah4xpXagDIIEHjVFQCgwc2XIpSFAp14K4mdwkgzSYS5dUAd7X3fNAPz9R87GGzQKzyutgRprx0Qbm4bVnVEYyrpNuk7';

    return new Promise((resolve,reject) => {
      this.http.post('http://127.0.0.1:8000/auth/convert-token?grant_type=convert_token&client_id='+clientID+'&client_secret='+clientSecret+'&backend=facebook&token='+fbToken, options)
        .map(res => res.json())
        .subscribe(
          data => {
            window.localStorage.setItem('internalTokenResponse', JSON.stringify(data));
            resolve(data);
          },
          err => {reject(err)}
        );
    });
  }

  refreshToken(refreshToken) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let clientID = 'uyGdgzWIqDW63MDetIbRu0xXn1Et4VRhSU2h2lNR';
    let clientSecret = 'B6mi5Yfv5oa4fyUvHQsj2lNVKjvHsZ90nzARcah4xpXagDIIEHjVFQCgwc2XIpSFAp14K4mdwkgzSYS5dUAd7X3fNAPz9R87GGzQKzyutgRprx0Qbm4bVnVEYyrpNuk7';

    return new Promise((resolve,reject) => {
      this.http.post('http://127.0.0.1:8000/auth/token?grant_type=refresh_token&client_id='+clientID+'&client_secret='+clientSecret+'&refresh_token='+refreshToken, options)
        .map(res => res.json())
        .subscribe(
          data => {
            window.localStorage.setItem('internalTokenResponse', JSON.stringify(data));
            resolve(data);
          },
          err => {reject(err)}
        );
    });
  }

  updateUserFBData(accessToken, fbUser) {
    console.log(accessToken);
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });
    let user = { "fbID" : fbUser.id}
    return new Promise((resolve, reject) => {
      this.http.patch("http://localhost:8000/me/", user, options)
        .map(res => res.json())
        .subscribe(
          data => {resolve(data)},
          err  => {reject(err)}
        )
    });
  }
}
