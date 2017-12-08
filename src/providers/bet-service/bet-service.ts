import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BetServiceProvider {
  data: any;

  constructor(public http: Http) {
    console.log('Hello BetServiceProvider Provider');
  }

  load(accessToken) {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    });
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/me/bets/', {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {resolve(this.data)},
          err => {reject(err)}
        )
    });
  }

}
