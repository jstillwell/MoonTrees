import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {
    constructor(private http: Http) { }

    addContact() {
      //TODO: need storage set up first. object or database?
    }
}
