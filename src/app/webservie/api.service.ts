import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable,throwError } from 'rxjs';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import {
  LoadingController,
  ToastController,
 } from '@ionic/angular';

const httpOptions = {
  headers: new HttpHeaders()
};
const apiUrl = "http://phpstack-201718-795798.cloudwaysapps.com/api_app/";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private currentUserSub = new BehaviorSubject<any>(null);
 

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage :Storage,
    public toastCtrl:ToastController,
  ) { 

    const user = JSON.parse(localStorage.getItem('userData'));
    this.currentUserSub.next(user);

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  getData(type): Observable<any> {
    return this.http.get(apiUrl+type,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getDataById(id: string): Observable<any> {
    const url = `${apiUrl}${id}`;
    return this.http.get(url,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postData(data,func): Observable<any> {
    const url = `${apiUrl}${func}`;
    return this.http.post(url, JSON.stringify(data),httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
        
      );
  }
  
  updateData(func,id: string, data): Observable<any> {
    const url = `${apiUrl}${func}/${id}`;
    return this.http.post(url,JSON.stringify(data),httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
  
  deleteData(id: string): Observable<{}> {
    const url = `${apiUrl}${id}`;
    return this.http.delete(url,httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

 

  public setAuthenSession(obj)
  {
    this.storage.set("userObj",obj);
  }

  public getAuthen(callback)
  {
    this.storage.get("userData").then(obj=>{
      if(callback)
      {
        callback(obj);
      }
    });
  }

  async  presentToast(msg) {
    const toast = await  this.toastCtrl.create({
      message: msg,
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }

  

 
  getStore(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('userData'));
    //this.currentUserSub.next(user);
    //return this.currentUserSub;
    return user;
  }

}
