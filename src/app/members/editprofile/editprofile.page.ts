import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Router,ActivatedRoute, } from  "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../webservie/api.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  validations_form: FormGroup;
  userProfile;
  img;
  res;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authen :AuthenticationService,
    private router :Router  ,
    private api :ApiService,
    private route: ActivatedRoute,
  ) { 

    this.userProfile =this.api.getStore();

    this.res = this.userProfile.data;
    this.img=this.userProfile.img;
  }

  ngOnInit() {
    

    this.validations_form = this.formBuilder.group({

      username: new FormControl(this.res.u_username, Validators.compose([
        Validators.pattern('^[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      
      name: new FormControl(this.res.u_name, Validators.required),
      lastname: new FormControl(this.res.u_lastname, Validators.required),
      email: new FormControl(this.res.u_email, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      phone: new FormControl(this.res.u_tel, Validators.compose([
        Validators.pattern('^[0-9]+$')
      ])),

    });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'กรอกชื่อผู้ใช้งานด้วยค่ะ!' },
      { type: 'pattern', message: 'กรอก a-zA-Z0-9 เท่านั้นค่ะ!' },
    ],
    'name': [
      { type: 'required', message: 'กรอกชื่อด้วยค่ะ!' }
    ],
    'lastname': [
      { type: 'required', message: 'กรอกนามสกุลด้วยค่ะ!' }
    ],
    'email': [
      { type: 'required', message: 'กรอกอีเมลด้วยค่ะ!.' },
      { type: 'pattern', message: 'กรอกอีเมลให้ถูกต้องด้วยค่ะ' }
    ],
    'phone': [
      { type: 'pattern', message: 'กรอกเฉพาะตัวเลขเท่านั้นค่ะ!' }
    ],
    


  }

  async onSubmit(values){
    //console.log(values);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
      duration: 2000
      });
      await loading.present();
      await this.api.updateData('account/updateprofile',this.route.snapshot.paramMap.get('id'),values)
      .subscribe(res => {
       
        loading.onWillDismiss().then(() => {
          this.api.presentToast(res.message);
          localStorage.setItem('userData',JSON.stringify(res))
          this.authen.login(res);
          this.router.navigate(['dashboard']);
          
           });
      
        }, (err) => {

          this.api.presentToast('ไม่พบสัญญาณ internet หรือไม่สามารถติดต่อ server ได้');

        });

  
}


}
