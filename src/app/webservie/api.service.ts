import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {
  LoadingController,
  ToastController,
 } from '@ionic/angular';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };
const apiUrl = "http://phpstack-201718-795798.cloudwaysapps.com/api/";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage :Storage,
    public toastCtrl:ToastController
  ) { }

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
    return this.http.get(apiUrl+type).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getDataById(id: string): Observable<any> {
    const url = `${apiUrl}${id}`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postData(data,func): Observable<any> {
    const url = `${apiUrl}${func}`;
    return this.http.post(url, JSON.stringify(data))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
  
  updateData(id: string, data): Observable<any> {
    const url = `${apiUrl}${id}`;
    return this.http.put(url, data)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
  
  deleteData(id: string): Observable<{}> {
    const url = `${apiUrl}${id}`;
    return this.http.delete(url)
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
    this.storage.get("userObj").then(obj=>{
      if(callback)
      {
        callback(obj);
      }
    });
  }

  async  presentToast(msg) {
    const toast = await  this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}