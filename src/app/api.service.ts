import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://192.168.0.108:600/api';
  header = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createPart(data): Observable<any> {
    const url = `${this.baseURL}/addPart`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  createProduct(data): Observable<any> {
    const url = `${this.baseURL}/addProduct`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  addCustomer(data): Observable<any> {
    const url = `${this.baseURL}/addCustomer`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  addOrder(data): Observable<any> {
    const url = `${this.baseURL}/addOrder`;
    return this.http
      .post(url, data)
      .pipe(catchError(this.errorMgmt));
  }

  getParts(): Observable<any> {
    const url = `${this.baseURL}/`;
    return this.http
      .get(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  getProducts(): Observable<any> {
    const url = `${this.baseURL}/getProducts`;
    return this.http
      .get(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  getProduct(id): Observable<any> {
    const url = `${this.baseURL}/getProduct/${id}`;
    return this.http
      .get(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  getPart(id): Observable<any> {
    const url = `${this.baseURL}/getPart/${id}`;
    return this.http
      .get(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  //Remove
  removePart(id): Observable<any> {
    const url = `${this.baseURL}/removePart/${id}`;
    return this.http
      .delete(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  removeProduct(id): Observable<any> {
    const url = `${this.baseURL}/removeProduct/${id}`;
    return this.http
      .delete(url, { headers: this.header })
      .pipe(catchError(this.errorMgmt));
  }

  //Update
  updatePart(part): Observable<any> {
    const url = `${this.baseURL}/updatePart/${part._id}`;
    console.log(part.quantity)
    part.quantity = part.quantity + 1;
    console.log(part.quantity)
    return this.http
      .put(url, part, {headers: this.header})
      .pipe(catchError(this.errorMgmt));
  }

//Update
updateminusPart(part): Observable<any> {
  const url = `${this.baseURL}/updatePart/${part._id}`;
  console.log(part.quantity)
  part.quantity = part.quantity - 1;
  console.log(part.quantity)
  return this.http
    .put(url, part, {headers: this.header})
    .pipe(catchError(this.errorMgmt));
}

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
