import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../webservie/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private api:ApiService
  ) { }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'u_username': [null, Validators.compose([
        Validators.required
      ])],
      'u_password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  // async forgotPass() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Forgot Password?',
  //     message: 'Enter you email address to send a reset link password.',
  //     inputs: [
  //       {
  //         name: 'email',
  //         type: 'email',
  //         placeholder: 'Email'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('Confirm Cancel');
  //         }
  //       }, {
  //         text: 'Confirm',
  //         handler: async () => {
  //           const loader = await this.loadingCtrl.create({
  //             duration: 2000
  //           });

  //           loader.present();
  //           loader.onWillDismiss().then(async l => {
  //             const toast = await this.toastCtrl.create({
  //               showCloseButton: true,
  //               message: 'Email was sended successfully.',
  //               duration: 3000,
  //               position: 'bottom'
  //             });

  //             toast.present();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  // goToHome() {
  //   console.log(this.onLoginForm.value.username);
   
  //   this.navCtrl.navigateRoot('/home');
  // }


  async login(){

    let username =this.onLoginForm.value.u_username;
    let password = this.onLoginForm.value.u_password;


    await this.api.postData({'u_username':username,'u_password':password},'login')
    .subscribe(res => {
        //let id = res['status'];
        console.log(res);
        //this.router.navigate(['/detail/'+id]);
      }, (err) => {
        console.log(err);
      });
  }



}
