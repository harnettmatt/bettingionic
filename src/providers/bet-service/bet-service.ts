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

  constructor(public http: Http) {
  }

  load(accessToken) {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    });
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/me/bets/', {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => {resolve(data)},
          err => {reject(err)}
        )
    });
  }

  makeBet(bet, accessToken) {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json' );
    headers.append('Authorization', 'Bearer ' + accessToken);
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post('http://127.0.0.1:8000/bets/', bet, options)
        .map(res => res.json())
        .subscribe(
          data => {resolve(data)},
          err => {reject(err)});
    });
  }

}
