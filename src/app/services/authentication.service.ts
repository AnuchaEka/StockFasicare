import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'userData';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState:any = new BehaviorSubject<any>(null);
 
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(res);
      }
    })
  }
 
  login(data) {
    return this.storage.set(TOKEN_KEY, data).then(() => {
      this.authenticationState.next(data);
    });
  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(null);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}
