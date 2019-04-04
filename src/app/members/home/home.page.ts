import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../webservie/api.service';

import {
  LoadingController,
  NavController,
  AlertController,
  MenuController,
  ToastController,
 } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userProfile;
  resdata: any;
  
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public api: ApiService, 
    public loadingController: LoadingController
  ) { 

   

  }

  ngOnInit() {
    //this.getUserDetails();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  


  async getData() {
    
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();
    await this.api.getData('getShop')
      .subscribe(res => {
        //console.log(res);
        this.resdata = res;
        loading.dismiss();
      }, err => {
        //console.log(err);
        loading.dismiss();
      });
  }

  getUserDetails() {
    this.api.getStore().subscribe(res => {
      this.userProfile = res.data;
      console.log(this.userProfile);
      
    });
  }

}
