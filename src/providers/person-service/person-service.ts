import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonServiceProvider {
  data: any;
  newPerson: any;

  constructor(public http: Http) {
  }

  loadPeople() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:8000/people/')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(this.data);
        });
    });
  }

  createPerson() {
    if (this.newPerson) {
      return Promise.resolve(this.newPerson);
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
      "last_name"  : "test_last_name"
    }

    let person = {
      "user"   : user,
      "wallet" : 0
    }

    return new Promise(resolve => {
      this.http.post('http://127.0.0.1:8000/people/', person, options)
        .map(res => res.json())
        .subscribe(data => {
          this.newPerson = data;
          console.log(data);
          resolve(this.newPerson);
        });
    });
  }

}
