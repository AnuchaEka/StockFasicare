import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
 
import { Platform,NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './webservie/api.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  resuser:any;
  img:any;
  res;
  userProfile;
  version = '1.0.4'
  public appPages = [
    {
      title: 'หน้าหลัก',
      url: '/home',
      icon: 'home',
      direct: 'root',
    },
    {
      title: 'เบิกสินค้าส่งให้ลูกค้า',
      url: '/list',
      icon: 'arrow-round-up',
      direct: 'forward',
    }
    ,
    {
      title: 'คืนสินค้าจากลูกค้า',
      url: '/list',
      icon: 'swap',
      direct: 'forward',
    }

    ,
    {
      title: 'สต๊อกสินค้าทั้งหมด',
      url: '/list',
      icon: 'logo-buffer',
      direct: 'forward',
    }

    ,
    {
      title: 'เบิกสินค้าจากโกดังใหญ่',
      url: '/list',
      icon: 'archive',
      direct: 'forward',
    }

    ,
    {
      title: 'ตรวจสอบสินค้าก่อนเข้าโกดังเล็ก',
      url: '/list',
      icon: 'checkbox-outline',
      direct: 'forward',
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private api:ApiService
    
  ) {
    this.initializeApp();
    //console.log(sessionStorage.getItem('userDD'));
    //this.getUserDetails();
  }

  

  initializeApp() {
    this.platform.ready().then(() => {
 
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.api.getAuthen(data=>{
      //   if(data)
      //   {
      //     this.authenticationService.authenticationState.subscribe(state => {

      //       // this.status = state.data;
      //        console.log(state);
      //       if (state!=null) {
      //         this.userProfile=state.data;  
      //         //console.log(this.userProfile);
             
      //         this.router.navigate(['/home']);
      //        }
      //     });
          
      //   }else{
      //     this.router.navigate(['/login']);
      //   }

      // });

      this.authenticationService.authenticationState.subscribe(state => {

        // this.status = state.data;
         console.log(state);
        if (state!=null) {
          this.userProfile=state.data;  
          this.img=state.img;
          //console.log(this.userProfile);
         
          this.router.navigate(['/home']);
         }else{
          this.router.navigate(['/login']);
         }
      });




    });
  }


  async logout() {

    const alert = await this.alertCtrl.create({
      header: 'ออกจากระบบ',
      message: 'คุณต้องการออกจากระบบหรือไม่ ?',
      mode:'ios',
      buttons: [{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            //this.router.navigateByUrl('home');  
            //console.log('** Saída do App Cancelada! **');
          }
      },{
          text: 'ตกลง',
          handler: () => {
            this.authenticationService.logout();
            this.navCtrl.navigateRoot('/login');
            
          }
      }]
  });
  await alert.present();

  }


  goToEditProgile(){

    this.router.navigate(['members','dashboard']);
  }

}
