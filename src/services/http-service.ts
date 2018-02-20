import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {AuthService} from './authservice';

let apiUrl = "http://localhost:3000/api/";

/*
Generated class for the AuthServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
	*/
@Injectable()
export class HttpService {

	constructor(public http: Http, public authService: AuthService) {
	}


	postData(data, type): Observable<any>{
		const headers = new Headers();
		return this.http.post(
			apiUrl+type,
			data,
			new RequestOptions({headers: headers}))
		.map(response=>response.json())
		.catch(this.error);
	}

	putData(data, type): Observable<any>{
		const headers = new Headers();
		return this.http.put(
			apiUrl+type,
			data,
			new RequestOptions({headers: headers}))
		.map(response=>response.json())
		.catch(this.error);
	}
  
	getData(url):Observable<any>{
		return this.http.get(`${apiUrl}${url}`)
      	.map(response => response.json())
      	.catch(this.error);
    }

    error(error: Response){
		console.log(error);
		let msgError: any;
		if (error.status == 500){
			msgError = error.json();
		} else {
			msgError = 'Erro de comunicação! Verifique seu acesso a internet!';
		}
		return Observable.throw(msgError);
    }


}
