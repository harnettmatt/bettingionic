import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FixtureServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FixtureServiceProvider {
  data: any

  constructor(public http: Http) {
    console.log('Hello FixtureServiceProvider Provider');
  }

  load(accessToken) {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    });
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8000/fixtures/', { headers: headers })
        .map(res => res.json())
        .subscribe(
          data => {resolve(data)},
          err => {reject(err)}
        )
    });
  }

}
